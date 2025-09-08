package com.example.ByTech_movil.Fabricante.controllers

import com.example.ByTech_movil.Fabricante.models.EnterpriseModel
import com.example.ByTech_movil.Fabricante.services.EnterpriseService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.Optional

@RestController
@RequestMapping("/enterprise")
@CrossOrigin(origins = ["exp://192.168.0.247:8081"])
class EnterpriseController {
    @Autowired
    private lateinit var enterpriseService: EnterpriseService

    @GetMapping
    fun getEnterprises(): List<EnterpriseModel> = enterpriseService.enterprise

    @PostMapping("/insertEnterprise")
    fun saveEnterprise(@RequestBody enterprise: EnterpriseModel): ResponseEntity<Any> {
        return try {
            ResponseEntity.ok(enterpriseService.saveEnterprise(enterprise))
        } catch (e: Exception) {
            if (e.message == "Enterprise already exists") {
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Enterprise already exists")
            } else {
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred")
            }
        }
    }

    @GetMapping("/{id}")
    fun getEnterpriseById(@PathVariable id: Long): ResponseEntity<EnterpriseModel> {
        val enterpriseOpt = enterpriseService.getById(id)
        return if (enterpriseOpt.isPresent) {
            ResponseEntity.ok(enterpriseOpt.get())
        } else {
            ResponseEntity.status(HttpStatus.NOT_FOUND).build()
        }
    }

    @PutMapping("/{id}")
    fun updateEnterpriseById(
        @RequestBody request: EnterpriseModel,
        @PathVariable id: Long
    ): ResponseEntity<Any> {
        return try {
            ResponseEntity.ok(enterpriseService.updateByID(request, id))
        } catch (e: Exception) {
            if (e.message == "Enterprise already exists") {
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Enterprise already exists")
            } else {
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred")
            }
        }
    }

    @DeleteMapping("/{id}")
    fun deleteEnterpriseById(@PathVariable id: Long): ResponseEntity<String> {
        val ok: Boolean = enterpriseService.deleteEnterprise(id)
        return if (ok) {
            ResponseEntity.ok("Enterprise with id $id deleted!")
        } else {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error, we have a problem and can't delete enterprise with id $id")
        }
    }

    @PostMapping("/{id}/addWorker")
    fun addWorkerToEnterprise(
        @PathVariable id: Long,
        @RequestBody workerId: Long
    ): ResponseEntity<String> {
        return try {
            val enterprise = enterpriseService.getById(id).orElseThrow { Exception("Enterprise not found") }
            val workers = enterprise.workers?.toMutableList() ?: mutableListOf()
            workers.add(workerId)
            enterprise.workers = workers
            enterpriseService.saveEnterprise(enterprise)
            ResponseEntity.ok("Trabajador agregado exitosamente a la empresa.")
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error al agregar trabajador a la empresa: ${e.message}")
        }
    }

    @DeleteMapping("/{id}/deleteWorker/{index}")
    fun deleteWorkerByIndex(
        @PathVariable id: Long,
        @PathVariable index: Int
    ): ResponseEntity<String> {
        return try {
            val enterprise = enterpriseService.getById(id).orElse(null)
                ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Enterprise not found")

            val workers = enterprise.workers?.toMutableList() ?: mutableListOf()
            if (index < 0 || index >= workers.size) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid worker index")
            }

            workers.removeAt(index)
            enterprise.workers = workers
            enterpriseService.saveEnterprise(enterprise)

            ResponseEntity.ok("Worker removed successfully")
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error deleting worker: ${e.message}")
        }
    }

    @GetMapping("/checkName/{name}")
    fun checkEnterpriseName(@PathVariable name: String): ResponseEntity<String> {
        val exists: Boolean = enterpriseService.existsByNombre(name)
        return if (exists) {
            ResponseEntity.status(HttpStatus.CONFLICT).body("Enterprise already exists")
        } else {
            ResponseEntity.ok("Enterprise name is available")
        }
    }
}
