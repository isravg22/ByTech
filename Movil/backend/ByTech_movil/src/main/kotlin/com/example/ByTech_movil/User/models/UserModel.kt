package com.example.ByTech_movil.User.models

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "user")
class UserModel {
    // Getters y setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @Column(name = "first_name")
    var firstName: String? = null

    @Column(name = "last_name")
    var lastName: String? = null

    @Column(name = "email")
    var email: String? = null

    @Column(name = "password")
    var password: String? = null

    @Column(name = "rol")
    var rol: String? = null

    @Column(name = "activated")
    var activated: Int = 0

    @Column(name = "user_name")
    var userName: String? = null

    @Column(name = "enterprise")
    var enterprise: Long? = null
}
