package com.example.ByTech_movil.Detail.models

import com.example.ByTech_movil.Product.models.Product
import com.example.ByTech_movil.Sales.models.Sale
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
class Detail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @ManyToOne(optional = false, cascade = [CascadeType.DETACH], fetch = FetchType.EAGER)
    var product: Product? = null

    @ManyToOne(optional = false, cascade = [CascadeType.DETACH], fetch = FetchType.EAGER)
    var sale: Sale? = null

    var amount: Int = 0

    @Column(columnDefinition = "DATE")
    var date: Date? = null
}