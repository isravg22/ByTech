package com.example.ByTech_movil.Fabricante.services

import com.example.ByTech_movil.Fabricante.models.EnterpriseModel
import com.example.ByTech_movil.Fabricante.repositories.IEnterpriseRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service
class EnterpriseService {
    @Autowired
    lateinit var enterpriseRepository: IEnterpriseRepository

    val enterprise: List<EnterpriseModel>
        get() = enterpriseRepository.findAll()

    @Throws(Exception::class)
    fun saveEnterprise(enterprise: EnterpriseModel): EnterpriseModel {
        if (existsByNombre(enterprise.nombre ?: "")) {
            throw Exception("Enterprise already exists")
        }
        return enterpriseRepository.save(enterprise)
    }

    fun getById(id: Long?): Optional<EnterpriseModel> {
        return enterpriseRepository.findById(id ?: -1)
    }

    @Throws(Exception::class)
    fun updateByID(request: EnterpriseModel, id: Long?): EnterpriseModel {
        val enterpriseModel: EnterpriseModel =
            enterpriseRepository.findById(id ?: -1).orElseThrow { Exception("Enterprise not found") }

        if (enterpriseModel.nombre != request.nombre && existsByNombre(request.nombre ?: "")) {
            throw Exception("Enterprise already exists")
        }

        enterpriseModel.nif = request.nif
        enterpriseModel.nombre = request.nombre
        enterpriseModel.boss = request.boss
        enterpriseModel.descripcion = request.descripcion
        enterpriseModel.workers = request.workers?.toMutableList()

        return enterpriseRepository.save(enterpriseModel)
    }

    fun deleteEnterprise(id: Long?): Boolean {
        return try {
            if (id != null && enterpriseRepository.existsById(id)) {
                enterpriseRepository.deleteById(id)
                true
            } else {
                false
            }
        } catch (e: Exception) {
            false
        }
    }

    fun existsByNombre(nombre: String): Boolean {
        return enterpriseRepository.existsByNombre(nombre)
    }
}
