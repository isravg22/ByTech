package com.ByTech.ByTech.Payment.controllers;

import com.ByTech.ByTech.Payment.models.Payment;
import com.ByTech.ByTech.Payment.repositories.PaymentRepository;
import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001"})
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;


    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    @PostMapping("/create-payment-intent")
    public Map<String, Object> createPaymentIntent(@RequestBody Map<String,Object> data) throws Exception {

        Long amount = Long.valueOf(data.get("amount").toString());
        String userEmail = data.get("userEmail").toString();

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amount)
                .setCurrency("eur")
                .build();

        PaymentIntent intent = PaymentIntent.create(params);

        Map<String, Object> response = new HashMap<>();
        response.put("clientSecret", intent.getClientSecret());
        response.put("paymentId", intent.getId());
        return response;
    }

    @PostMapping("/confirm")
    public ResponseEntity<?> confirmPayment(@RequestBody Map<String, Object> data) {
        String paymentId = data.get("paymentId").toString();
        String userEmail = data.get("userEmail").toString();
        Long amount = Long.valueOf(data.get("amount").toString());

        Payment payment = new Payment();
        payment.setUserEmail(userEmail);
        payment.setAmount(amount);
        payment.setCurrency("eur");
        payment.setStatus("succeeded");
        payment.setCreatedAt(LocalDateTime.now());
        paymentRepository.save(payment);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/all")
    public List<Payment> getAllPayments(){
        return paymentRepository.findAllByOrderByCreatedAtDesc();
    }
}