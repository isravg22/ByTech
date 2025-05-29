package com.ByTech.ByTech.Payment.controllers;

import com.ByTech.ByTech.Payment.models.Payment;
import com.ByTech.ByTech.Payment.repositories.PaymentRepository;
import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
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

    public PaymentController(){
        Stripe.apiKey="sk_test_51RU8ptRuIogdvrj4zRM6fSNCTtDd23e4yZrxk8vYOE7An2kNeQXUyJxuZfnmWTYV0wo22Ko928qbZPlmTInfkmiY00tAi3vuO5";
    }

    @PostMapping("/create-payment-intent")
    public Map<String, Object> createPaymentIntent(@RequestBody Map<String,Object> data) throws Exception {
        Long amount=Long.valueOf(data.get("amount").toString());
        String userEmail=data.get("userEmail").toString();

        PaymentIntentCreateParams params= PaymentIntentCreateParams.builder().setAmount(amount).setCurrency("eur").build();

        PaymentIntent intent= PaymentIntent.create(params);

        Payment payment = new Payment();
        payment.setUserEmail(userEmail);
        payment.setAmount(amount);
        payment.setCurrency("eur");
        payment.setStatus("pending");
        payment.setCreatedAt(LocalDateTime.now());

        paymentRepository.save(payment);

        Map<String,Object> responseData= new HashMap<>();
        responseData.put("clientSecret", intent.getClientSecret());
        responseData.put("paymentId", payment.getId());
        return responseData;
    }

    @PostMapping("/confirm")
    public void confirmPayment(@RequestBody Map<String, Object> data) {
        Long paymentId = Long.valueOf(data.get("paymentId").toString());
        Payment payment = paymentRepository.findById(paymentId).orElseThrow();
        payment.setStatus("succeeded");
        paymentRepository.save(payment);
    }

    @GetMapping("/all")
    public List<Payment> getAllPayments(){
        return paymentRepository.findAllByOrderByCreatedAtDesc();
    }

}
