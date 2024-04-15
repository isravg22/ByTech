package com.ByTech.ByTech.Productos.Componentes.controllers;

import com.ByTech.ByTech.Productos.Componentes.models.ComponentsModel;
import com.ByTech.ByTech.Productos.Componentes.services.ComponentsService;
import com.ByTech.ByTech.Productos.Ordenadores.models.OrdenadorModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/components")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001"})

public class ComponentsController {
    @Autowired
    private ComponentsService componentsService;

    @GetMapping
    public ArrayList<ComponentsModel> getOrdenadores(){
        return this.componentsService.getComponents();
    }

    @PostMapping(path = "/insertComponents")
    public ComponentsModel saveOrdenador(@RequestBody ComponentsModel component){
        return this.componentsService.saveComponents(component);
    }

    @GetMapping(path = "/{id}")
    public Optional<ComponentsModel> getComponentsById(@PathVariable("id") Long id){
        return this.componentsService.getById(id);
    }

    @PutMapping(path = "/{id}")
    public ComponentsModel updateComponentById(@RequestBody ComponentsModel request, @PathVariable("id") Long id){
        return this.componentsService.updateByID(request,id);
    }

    @DeleteMapping(path = "/{id}")
    public String deleteOrdenadorById(@PathVariable("id") Long id){
        boolean ok=this.componentsService.deleteComponents(id);
        if(ok){
            return "Components with id "+id+" deleted!";
        }else{
            return "Error, we have a problem and can´t delete components with id "+id;
        }
    }
}
