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
@CrossOrigin(origins = {"http://localhost:3001","http://localhost:3000"})

public class EnterpriseController {
    @Autowired
    private EnterpriseService enterpriseService;

    @GetMapping
    public ArrayList<EnterpriseModel> getEnterprise(){
        return  this.enterpriseService.getEnterprise();
    }

    @PostMapping(path = "/insertEnterprise")
    public EnterpriseModel saveEnterprise(@RequestBody EnterpriseModel enterprise){
        return this.enterpriseService.saveEnterprise(enterprise);
    }

    @GetMapping(path = "/{id}")
    public Optional<EnterpriseModel> getEnterpriseById(@PathVariable("id") Long id){
        return this.enterpriseService.getById(id);
    }

    @PutMapping(path = "/{id}")
    public EnterpriseModel updateEnterpriseById(@RequestBody EnterpriseModel request, @PathVariable("id") Long id){
        return this.enterpriseService.updateByID(request,id);
    }

    @DeleteMapping(path = "/{id}")
    public String deleteEnterpriseById(@PathVariable("id") Long id){
        boolean ok=this.enterpriseService.deleteEnterprise(id);
        if(ok){
            return "Enterprise with id "+id+" deleted!";
        }else{
            return "Error, we have a problem and can´t delete enterprise with id "+id;
        }
    }

    @PostMapping("/{id}/addWorker")
    public ResponseEntity<String> addWorkerToEnterprise(@PathVariable Long id, @RequestBody Long workerId) {
        try {
            EnterpriseModel enterprise = enterpriseService.getById(id).get();


            List<Long> workers = enterprise.getWorkers();
            workers.add(workerId);
            System.out.println("___________");
            workers.forEach(System.out::println);
            enterprise.setWorkers(workers);
            enterpriseService.saveEnterprise(enterprise);
            System.out.println("ENTERPRISE:\n"+enterpriseService.getById(id));
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
            System.out.println("___________");
            workers.forEach(System.out::println);
            enterprise.setWorkers(workers);
            enterpriseService.saveEnterprise(enterprise);
            System.out.println("ENTERPRISE:\n"+enterpriseService.getById(id));

            return ResponseEntity.ok("Worker removed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting worker: " + e.getMessage());
        }
    }



}
