package com.example.ByTech_movil.Fabricante.repositories

import com.example.ByTech_movil.Fabricante.models.EnterpriseModel
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface IEnterpriseRepository : JpaRepository<EnterpriseModel, Long> {
    fun existsByNombre(nombre: String): Boolean
}
