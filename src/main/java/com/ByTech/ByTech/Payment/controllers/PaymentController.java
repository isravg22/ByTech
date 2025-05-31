package com.ByTech.ByTech.Payment.controllers;

import com.ByTech.ByTech.Fabricante.models.EnterpriseModel;
import com.ByTech.ByTech.Fabricante.repositories.IEnterpriseRepository;
import com.ByTech.ByTech.Payment.models.Payment;
import com.ByTech.ByTech.Payment.repositories.PaymentRepository;
import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Transfer;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.TransferCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001"})
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private IEnterpriseRepository enterpriseRepository;

    public PaymentController(){
        Stripe.apiKey="sk_test_51RU8ptRuIogdvrj4zRM6fSNCTtDd23e4yZrxk8vYOE7An2kNeQXUyJxuZfnmWTYV0wo22Ko928qbZPlmTInfkmiY00tAi3vuO5";
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

    @GetMapping("/by-enterprise/{enterpriseId}")
    public List<Payment> getPaymentsByEnterprise(@PathVariable Long enterpriseId) {
        return paymentRepository.findAllByEnterpriseIdOrderByCreatedAtDesc(enterpriseId);
    }

}
