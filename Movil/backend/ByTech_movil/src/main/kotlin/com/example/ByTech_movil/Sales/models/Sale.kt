package com.example.ByTech_movil.Sales.models

import com.example.ByTech_movil.User.models.UserModel
import jakarta.persistence.*
import java.util.Date

@Entity
class Sale(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,

    @Column
    var total: Double? = null,

    @Column(columnDefinition = "DATE")
    var date: Date? = null,

    @ManyToOne(optional = false, cascade = [CascadeType.DETACH], fetch = FetchType.EAGER)
    var client: UserModel? = null
)
