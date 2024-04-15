package com.ByTech.ByTech.Productos.Ordenadores.controllers;

import com.ByTech.ByTech.Productos.Ordenadores.models.OrdenadorModel;
import com.ByTech.ByTech.Productos.Ordenadores.services.OrdenadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Base64;
import java.util.Optional;

@RestController
@RequestMapping("/ordenador")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001"})

public class OrdenadorController {
    @Autowired
    private OrdenadorService ordenadorService;

    @GetMapping
    public ArrayList<OrdenadorModel> getOrdenadores(){
        return this.ordenadorService.getOrdenadores();
    }

    @PostMapping(path = "/insertOrdenador")
    public OrdenadorModel saveOrdenador(@RequestBody OrdenadorModel ordenador){
        String image=ordenador.getImage() +"";
        String imageDataBytes=image.substring(image.indexOf(",")+1);
        System.out.println("CADENA : "+imageDataBytes);
        byte[] imageBytes= Base64.getDecoder().decode(imageDataBytes);
        ordenador.setImage(imageBytes);
        return this.ordenadorService.saveOrdenador(ordenador);
    }

    @GetMapping(path = "/{id}")
    public Optional<OrdenadorModel> getOrdenadorById(@PathVariable("id") Long id){
        return this.ordenadorService.getById(id);
    }

    @PutMapping(path = "/{id}")
    public OrdenadorModel updateOrdenadorById(@RequestBody OrdenadorModel request, @PathVariable("id") Long id){
        return this.ordenadorService.updateByID(request,id);
    }

    @DeleteMapping(path = "/{id}")
    public String deleteOrdenadorById(@PathVariable("id") Long id){
        boolean ok=this.ordenadorService.deleteOrdenador(id);
        if(ok){
            return "Ordenador with id "+id+" deleted!";
        }else{
            return "Error, we have a problem and can´t delete ordenador with id "+id;
        }
    }
}
