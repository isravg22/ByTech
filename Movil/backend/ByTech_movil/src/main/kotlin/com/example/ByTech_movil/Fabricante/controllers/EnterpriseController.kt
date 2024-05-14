package com.example.ByTech_movil.Fabricante.controllers

import com.example.ByTech_movil.Fabricante.models.EnterpriseModel
import com.example.ByTech_movil.Fabricante.services.EnterpriseService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.Optional
import java.util.function.Consumer

@RestController
@RequestMapping("/enterprise")
@CrossOrigin(origins = ["exp://192.168.0.247:8081"])
class EnterpriseController {
    @Autowired
    private val enterpriseService: EnterpriseService? = null

    @get:GetMapping
    val enterprise: MutableList<EnterpriseModel?>?
        get() = enterpriseService?.enterprise

    @PostMapping(path = ["/insertEnterprise"])
    fun saveEnterprise(@RequestBody enterprise: EnterpriseModel?): EnterpriseModel {
        return enterpriseService!!.saveEnterprise(enterprise)
    }

    @GetMapping(path = ["/{id}"])
    fun getEnterpriseById(@PathVariable("id") id: Long?): Optional<EnterpriseModel?> {
        return enterpriseService!!.getById(id)
    }

    @PutMapping(path = ["/{id}"])
    fun updateEnterpriseById(
        @RequestBody request: EnterpriseModel?,
        @PathVariable("id") id: Long?
    ): EnterpriseModel {
        return enterpriseService!!.updateByID(request!!, id)
    }

    @DeleteMapping(path = ["/{id}"])
    fun deleteEnterpriseById(@PathVariable("id") id: Long): String {
        val ok: Boolean = enterpriseService!!.deleteEnterprise(id)
        return if (ok) {
            "Enterprise with id $id deleted!"
        } else {
            "Error, we have a problem and can´t delete enterprise with id $id"
        }
    }

    @PostMapping("/{id}/addWorker")
    fun addWorkerToEnterprise(
        @PathVariable id: Long?,
        @RequestBody workerId: Long
    ): ResponseEntity<String> {
        try {
            val enterprise: EnterpriseModel = enterpriseService!!.getById(id).get()


            val workers: MutableList<Long> = enterprise.workers as MutableList<Long>
            workers.add(workerId)
            println("___________")
            workers.forEach(Consumer { x: Long? -> println(x) })
            enterprise.workers=workers
            enterpriseService.saveEnterprise(enterprise)

            return ResponseEntity.ok("Trabajador agregado exitosamente a la empresa.")
        } catch (e: Exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error al agregar trabajador a la empresa: " + e.message)
        }
    }

    @DeleteMapping("/{id}/deleteWorker/{index}")
    fun deleteWorkerByIndex(
        @PathVariable id: Long?,
        @PathVariable index: Int
    ): ResponseEntity<String> {
        try {
            val enterprise: EnterpriseModel = enterpriseService!!.getById(id).orElse(null)
                ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Enterprise not found")

            val workers: MutableList<Long>? = enterprise.workers as MutableList<Long>?
            if (workers != null) {
                if (index < 0 || index >= workers.size) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid worker index")
                }
            }

            workers!!.removeAt(index)
            println("___________")
            workers.forEach(Consumer { x: Long? -> println(x) })
            enterprise.workers
            enterpriseService.saveEnterprise(enterprise)


            return ResponseEntity.ok("Worker removed successfully")
        } catch (e: Exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error deleting worker: " + e.message)
        }
    }
}
