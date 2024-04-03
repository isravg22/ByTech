package com.ByTech.ByTech.Fabricante.controllers;

import com.ByTech.ByTech.Fabricante.models.EnterpriseModel;
import com.ByTech.ByTech.Fabricante.services.EnterpriseService;
import com.ByTech.ByTech.Productos.Ordenadores.models.OrdenadorModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/enterprise")
@CrossOrigin(origins = "http://localhost:3000")

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
}
