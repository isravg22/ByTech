package com.example.ByTech_movil.Fabricante.services

import com.example.ByTech_movil.Fabricante.models.EnterpriseModel
import com.example.ByTech_movil.Fabricante.repositories.IEnterpriseRepository
import com.example.ByTech_movil.User.repositories.IUserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.Optional

@Service
class EnterpriseService {
    @Autowired
    var enterpriseRepository: IEnterpriseRepository? = null

    @Autowired
    var userRepository: IUserRepository? = null

    val enterprise: MutableList<EnterpriseModel?>?
        get() = enterpriseRepository?.findAll()

    fun saveEnterprise(enterprise: EnterpriseModel?): EnterpriseModel {
        return enterpriseRepository!!.save(enterprise!!)
    }

    fun getById(id: Long?): Optional<EnterpriseModel?> {
        return enterpriseRepository!!.findById(id!!)
    }

    fun updateByID(request: EnterpriseModel, id: Long?): EnterpriseModel {
        val enterpriseModel: EnterpriseModel = enterpriseRepository!!.findById(id!!).get()

        enterpriseModel.nif=request.nif
        enterpriseModel.nombre=request.nombre
        enterpriseModel.boss=request.boss
        enterpriseModel.descripcion=request.descripcion
        enterpriseModel.workers=request.workers

        enterpriseRepository!!.save(enterpriseModel)

        return enterpriseModel
    }

    fun deleteEnterprise(id: Long?): Boolean {
        try {
            enterpriseRepository!!.deleteById(id!!)
            return true
        } catch (e: Exception) {
            return false
        }
    }
}
