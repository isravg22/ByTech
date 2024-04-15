package com.ByTech.ByTech.Productos.Gaming.controllers;


import com.ByTech.ByTech.Productos.Gaming.models.GamingModel;
import com.ByTech.ByTech.Productos.Gaming.services.GamingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/gaming")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001"})
public class GamingController {

    @Autowired
    private GamingService gamingService;

    @GetMapping
    public ArrayList<GamingModel> getGaming(){
        return this.gamingService.getGaming();
    }

    @PostMapping(path = "/insertGaming")
    public GamingModel saveGaming(@RequestBody GamingModel gaming){
        return  this.gamingService.saveGaming(gaming);
    }

    @GetMapping(path = "/{id}")
    public Optional<GamingModel> getGamingById(@PathVariable("id") Long id){
        return this.gamingService.getByID(id);
    }

    @PutMapping(path = "/{id}")
    public GamingModel updateGamingById(@RequestBody GamingModel request, @PathVariable("id") Long id){
        return this.gamingService.updateByID(request,id);
    }

    @DeleteMapping(path = "/{id}")
    public String deleteGamingById(@PathVariable("id") Long id){
        boolean ok= this.gamingService.deleteGaming(id);
        if(ok){
            return "Gaming with id "+id+" deleted!";
        }else{
            return "Error, we have a problem and can´t delete gaming with id "+ id;
        }
    }
}
