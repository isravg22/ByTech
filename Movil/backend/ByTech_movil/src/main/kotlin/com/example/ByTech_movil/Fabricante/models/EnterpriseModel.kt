package com.example.ByTech_movil.Fabricante.models

import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "Enterprise")
class EnterpriseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @Column(name = "nombre")
    var nombre: String? = null

    @Column(name = "descripcion")
    var descripcion: String? = null

    @Column(name = "nif")
    var nif: String? = null

    @Column
    var boss: Long? = null

    @ElementCollection
    var workers: MutableList<Long>? = mutableListOf()

    override fun toString(): String {
        return "EnterpriseModel(id=$id, nombre=$nombre, descripcion=$descripcion, nif=$nif, boss=$boss, workers=$workers)"
    }
}
