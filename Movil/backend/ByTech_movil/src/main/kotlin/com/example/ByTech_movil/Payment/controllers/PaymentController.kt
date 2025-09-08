package com.example.ByTech_movil.Payment.controllers

import com.example.ByTech_movil.Fabricante.repositories.IEnterpriseRepository
import com.example.ByTech_movil.Payment.models.Payment
import com.example.ByTech_movil.Payment.repositories.PaymentRepository
import com.stripe.Stripe
import com.stripe.model.PaymentIntent
import com.stripe.param.PaymentIntentCreateParams
import jakarta.annotation.PostConstruct
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.LocalDateTime

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = ["exp://192.168.0.247:8081"])
class PaymentController {

    @Autowired
    private lateinit var paymentRepository: PaymentRepository

    @Autowired
    private lateinit var enterpriseRepository: IEnterpriseRepository

    @Value("\${stripe.api.key}")
    private lateinit var stripeApiKey: String

    @PostConstruct
    fun init() {
        Stripe.apiKey = stripeApiKey
    }

    @PostMapping("/create-payment-intent")
    @Throws(Exception::class)
    fun createPaymentIntent(@RequestBody data: Map<String, Any>): Map<String, Any> {
        val amount: Long = (data["amount"] as Number).toLong()
        val userEmail: String = data["userEmail"] as String

        val params: PaymentIntentCreateParams = PaymentIntentCreateParams.builder()
            .setAmount(amount)
            .setCurrency("eur")
            .build()

        val intent: PaymentIntent = PaymentIntent.create(params)

        return mapOf(
            "clientSecret" to intent.clientSecret,
            "paymentId" to intent.id
        )
    }

    @PostMapping("/confirm")
    fun confirmPayment(@RequestBody data: Map<String, Any>): ResponseEntity<*> {
        val paymentId: String = data["paymentId"] as String
        val userEmail: String = data["userEmail"] as String
        val amount: Long = (data["amount"] as Number).toLong()

        val payment = Payment().apply {
            this.userEmail = userEmail
            this.amount = amount
            this.currency = "eur"
            this.status = "succeeded"
            this.createdAt = LocalDateTime.now()
        }

        paymentRepository.save(payment)

        return ResponseEntity.ok().build<Any>()
    }

    @GetMapping("/all")
    fun allPayments(): List<Payment> = paymentRepository.findAllByOrderByCreatedAtDesc() ?: emptyList()
}
