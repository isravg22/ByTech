package com.ByTech.ByTech.Productos.Componentes.services;

import com.ByTech.ByTech.Productos.Componentes.models.ComponentsModel;
import com.ByTech.ByTech.Productos.Componentes.repositories.IComponentsRepository;
import com.ByTech.ByTech.Productos.Ordenadores.models.OrdenadorModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class ComponentsService {
    @Autowired
    IComponentsRepository componentsRepository;

    public ArrayList<ComponentsModel> getComponents(){
        return (ArrayList<ComponentsModel>) componentsRepository.findAll();
    }

    public ComponentsModel saveComponents(ComponentsModel component){
        return componentsRepository.save(component);
    }

    public Optional<ComponentsModel> getById(Long id){
        return componentsRepository.findById(id);
    }

    public ComponentsModel updateByID(ComponentsModel request, Long id){
        ComponentsModel componentsModel= componentsRepository.findById(id).get();

        componentsModel.setNombre(request.getNombre());
        componentsModel.setDescripcion(request.getDescripcion());
        componentsModel.setFabricante(request.getFabricante());

        componentsRepository.save(componentsModel);

        return componentsModel;
    }

    public Boolean deleteComponents(Long id){
        try{
            componentsRepository.deleteById(id);
            return true;
        }catch (Exception e){
            return false;
        }
    }
}
