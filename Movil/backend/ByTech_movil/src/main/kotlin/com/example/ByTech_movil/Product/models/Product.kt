package com.example.ByTech_movil.Product.models

import jakarta.persistence.*
import java.util.Date

@Entity
@Table(name = "product")
class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @Column
    var name: String? = null

    @Column
    var price: Double? = null

    @Column
    var description: String? = null

    @Column
    var category: String? = null

    @Column
    var image: String? = null

    @Column
    var unidades: Long? = null

    @Column
    var fabricante: Long? = null

    @Column
    var vendidas: Long? = 0L

    @Column
    var registradas: Long? = null

    @Column(columnDefinition = "DATE")
    var date: Date? = null
}