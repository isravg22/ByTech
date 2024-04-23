package com.ByTech.ByTech.Productos.Ordenadores.services;

import com.ByTech.ByTech.Productos.Ordenadores.models.OrdenadorModel;
import com.ByTech.ByTech.Productos.Ordenadores.repositories.IOrdenadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
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
        ordenadorModel.setImage(request.getImage());

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

    public List<OrdenadorModel> getOrdenadoresByFabricante(Long idEnterprise){
        return ordenadorRepository.findByFabricante(idEnterprise);
    }


}
