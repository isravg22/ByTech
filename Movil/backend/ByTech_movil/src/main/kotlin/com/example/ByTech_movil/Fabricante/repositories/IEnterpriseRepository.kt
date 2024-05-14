package com.example.ByTech_movil.Fabricante.repositories

import com.example.ByTech_movil.Fabricante.models.EnterpriseModel
import org.springframework.data.jpa.repository.JpaRepository

interface IEnterpriseRepository : JpaRepository<EnterpriseModel?, Long?>
