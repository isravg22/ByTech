package com.example.ByTech_movil.Fabricante.models

import jakarta.persistence.Column
import jakarta.persistence.ElementCollection
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "Enterprise")
class EnterpriseModel {
    // Getters y setters
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
    var workers: List<Long>? = null

    override fun toString(): String {
        return "EnterpriseModel{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", nif='" + nif + '\'' +
                ", boss=" + boss +
                ", workers=" + workers +
                '}'
    }
}
