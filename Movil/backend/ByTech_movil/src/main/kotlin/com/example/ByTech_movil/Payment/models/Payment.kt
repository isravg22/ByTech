package com.example.ByTech_movil.Payment.models

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import java.time.LocalDateTime

@Entity
class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    var userEmail: String? = null
    var amount: Long? = null
    var currency: String? = null
    var status: String? = null
    var createdAt: LocalDateTime? = null
}
