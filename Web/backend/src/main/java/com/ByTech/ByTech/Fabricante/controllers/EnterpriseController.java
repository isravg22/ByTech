package com.ByTech.ByTech.Fabricante.controllers;

import com.ByTech.ByTech.Fabricante.models.EnterpriseModel;
import com.ByTech.ByTech.Fabricante.services.EnterpriseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/enterprise")
@CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000"})
public class EnterpriseController {
    @Autowired
    private EnterpriseService enterpriseService;

    @GetMapping
    public ArrayList<EnterpriseModel> getEnterprise() {
        return this.enterpriseService.getEnterprise();
    }

    @PostMapping(path = "/insertEnterprise")
    public ResponseEntity<?> saveEnterprise(@RequestBody EnterpriseModel enterprise) {
        try {
            return ResponseEntity.ok(this.enterpriseService.saveEnterprise(enterprise));
        } catch (Exception e) {
            if (e.getMessage().equals("Enterprise already exists")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Enterprise already exists");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
            }
        }
    }

    @GetMapping(path = "/{id}")
    public Optional<EnterpriseModel> getEnterpriseById(@PathVariable("id") Long id) {
        return this.enterpriseService.getById(id);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> updateEnterpriseById(@RequestBody EnterpriseModel request, @PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(this.enterpriseService.updateByID(request, id));
        } catch (Exception e) {
            if (e.getMessage().equals("Enterprise already exists")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Enterprise already exists");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
            }
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> deleteEnterpriseById(@PathVariable("id") Long id) {
        boolean ok = this.enterpriseService.deleteEnterprise(id);
        if (ok) {
            return ResponseEntity.ok("Enterprise with id " + id + " deleted!");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error, we have a problem and can't delete enterprise with id " + id);
        }
    }

    @PostMapping("/{id}/addWorker")
    public ResponseEntity<String> addWorkerToEnterprise(@PathVariable Long id, @RequestBody Long workerId) {
        try {
            EnterpriseModel enterprise = enterpriseService.getById(id).get();
            List<Long> workers = enterprise.getWorkers();
            workers.add(workerId);
            enterprise.setWorkers(workers);
            enterpriseService.saveEnterprise(enterprise);
            return ResponseEntity.ok("Trabajador agregado exitosamente a la empresa.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al agregar trabajador a la empresa: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}/deleteWorker/{index}")
    public ResponseEntity<String> deleteWorkerByIndex(@PathVariable Long id, @PathVariable int index) {
        try {
            EnterpriseModel enterprise = enterpriseService.getById(id).orElse(null);
            if (enterprise == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Enterprise not found");
            }

            List<Long> workers = enterprise.getWorkers();
            if (index < 0 || index >= workers.size()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid worker index");
            }

            workers.remove(index);
            enterprise.setWorkers(workers);
            enterpriseService.saveEnterprise(enterprise);

            return ResponseEntity.ok("Worker removed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting worker: " + e.getMessage());
        }
    }

    @GetMapping("/checkName/{name}")
    public ResponseEntity<String> checkEnterpriseName(@PathVariable String name) {
        boolean exists = enterpriseService.existsByNombre(name);
        if (exists) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Enterprise already exists");
        } else {
            return ResponseEntity.ok("Enterprise name is available");
        }
    }
}
