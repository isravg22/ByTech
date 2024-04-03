package com.ByTech.ByTech.Productos.Ordenadores.services;

import com.ByTech.ByTech.Productos.Ordenadores.models.OrdenadorModel;
import com.ByTech.ByTech.Productos.Ordenadores.repositories.IOrdenadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class OrdenadorService {
    @Autowired
    IOrdenadorRepository ordenadorRepository;

    public ArrayList<OrdenadorModel> getOrdenadores(){
        return (ArrayList<OrdenadorModel>) ordenadorRepository.findAll();
    }

    public OrdenadorModel saveOrdenador(OrdenadorModel ordenador){
        return ordenadorRepository.save(ordenador);
    }

    public Optional<OrdenadorModel> getById(Long id){
        return ordenadorRepository.findById(id);
    }

    public OrdenadorModel updateByID(OrdenadorModel request, Long id){
        OrdenadorModel ordenadorModel= ordenadorRepository.findById(id).get();

        ordenadorModel.setNombre(request.getNombre());
        ordenadorModel.setDescripcion(request.getDescripcion());
        ordenadorModel.setFabricante(request.getFabricante());
        ordenadorModel.setPrecio(request.getPrecio());
        ordenadorModel.setUnidades(request.getUnidades());

        ordenadorRepository.save(ordenadorModel);

        return ordenadorModel;
    }

    public Boolean deleteOrdenador(Long id){
        try{
            ordenadorRepository.deleteById(id);
            return true;
        }catch (Exception e){
            return false;
        }
    }
}
