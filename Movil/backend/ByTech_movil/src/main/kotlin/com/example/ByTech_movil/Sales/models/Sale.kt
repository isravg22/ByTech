package com.example.ByTech_movil.Sales.models

import com.example.ByTech_movil.User.models.UserModel
import jakarta.persistence.CascadeType
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.ManyToOne
import java.util.Date

@Entity
class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @Column
    var total: Double? = null

    @Column(columnDefinition = "DATE")
    var date: Date? = null

    @ManyToOne(optional = false, cascade = [CascadeType.DETACH], fetch = FetchType.EAGER)
    private var client: UserModel? = null

    constructor()

    constructor(total: Double?, date: Date?, client: UserModel?) {
        this.total = total
        this.date = date
        this.client = client
    }

    fun getClient(): UserModel? {
        return client
    }

    fun setClient(client: UserModel?) {
        this.client = client
    }
}
