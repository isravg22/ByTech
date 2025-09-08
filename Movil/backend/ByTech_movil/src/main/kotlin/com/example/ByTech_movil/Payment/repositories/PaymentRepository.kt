package com.example.ByTech_movil.Payment.repositories

import com.example.ByTech_movil.Payment.models.Payment
import org.springframework.data.jpa.repository.JpaRepository

interface PaymentRepository : JpaRepository<Payment, Long> {
    fun findAllByOrderByCreatedAtDesc(): List<Payment>
}
