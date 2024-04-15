package com.ByTech.ByTech.Productos.Smartphones.controllers;

import com.ByTech.ByTech.Productos.Smartphones.models.SmartphoneModel;
import com.ByTech.ByTech.Productos.Smartphones.services.SmartphoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/smartphone")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001"})
public class SmartphoneController {
    @Autowired
    private SmartphoneService smartphoneService;

    @GetMapping
    public ArrayList<SmartphoneModel> getSmarphone(){
        return this.smartphoneService.getSmartphones();
    }

    @PostMapping(path = "/insertSmartphone")
    public SmartphoneModel saveSmartphone(@RequestBody SmartphoneModel smartphone){
        return this.smartphoneService.saveSmartphone(smartphone);
    }

    @GetMapping(path = "/{id}")
    public Optional<SmartphoneModel> getSmartphoneById(@PathVariable("id") Long id){
        return this.smartphoneService.getByID(id);
    }

    @PutMapping(path = "/{id}")
    public SmartphoneModel updateSmartphoneById(@RequestBody SmartphoneModel request, @PathVariable("id") Long id){
        return this.smartphoneService.updateByID(request,id);
    }

    @DeleteMapping(path = "/{id}")
    public String deleteSmartphone(@PathVariable("id") Long id){
        boolean ok= this.smartphoneService.deleteSmartphone(id);
        if(ok){
            return "Smartphone with id "+id+" deleted!";
        }else{
            return "Error, we have a problem and can´t delete smartphone with id "+id;
        }
    }
}
