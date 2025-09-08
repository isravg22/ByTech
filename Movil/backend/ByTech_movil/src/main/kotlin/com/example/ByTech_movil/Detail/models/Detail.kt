package com.example.ByTech_movil.Detail.models

import com.example.ByTech_movil.Product.models.Product
import com.example.ByTech_movil.Sales.models.Sale
import jakarta.persistence.*
import java.util.Date

@Entity
class Detail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @ManyToOne(optional = false, cascade = arrayOf(CascadeType.DETACH), fetch = FetchType.EAGER)
    var product: Product? = null

    @ManyToOne(optional = false, cascade = arrayOf(CascadeType.DETACH), fetch = FetchType.EAGER)
    var sale: Sale? = null

    var amount: Int = 0

    @Column(columnDefinition = "DATE")
    var date: Date? = null
}
