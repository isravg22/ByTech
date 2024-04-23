package com.ByTech.ByTech.Productos.Smartphones.services;


import com.ByTech.ByTech.Productos.Ordenadores.models.OrdenadorModel;
import com.ByTech.ByTech.Productos.Smartphones.models.SmartphoneModel;
import com.ByTech.ByTech.Productos.Smartphones.repositories.ISmartphoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SmartphoneService {

    @Autowired
    ISmartphoneRepository smartphoneRepository;

    public ArrayList<SmartphoneModel>  getSmartphones(){
        return (ArrayList<SmartphoneModel>) smartphoneRepository.findAll();
    }

    public SmartphoneModel saveSmartphone(SmartphoneModel smartphone){
        return smartphoneRepository.save(smartphone);
    }

    public Optional<SmartphoneModel> getByID(Long id){
        return  smartphoneRepository.findById(id);
    }

    public SmartphoneModel updateByID(SmartphoneModel request,Long id){
        SmartphoneModel smartphoneModel = smartphoneRepository.findById(id).get();

        smartphoneModel.setDescripcion(request.getDescripcion());
        smartphoneModel.setFabricante(request.getFabricante());
        smartphoneModel.setPrecio(request.getPrecio());
        smartphoneModel.setNombre(request.getNombre());
        smartphoneModel.setUnidades(request.getUnidades());
        smartphoneModel.setImage(request.getImage());

        smartphoneRepository.save(smartphoneModel);

        return smartphoneModel;
    }

    public Boolean deleteSmartphone(Long id){
        try{
            smartphoneRepository.deleteById(id);
            return true;
        }catch (Exception e){
            return false;
        }
    }
    public List<SmartphoneModel> getSmartphonesByFabricante(Long idEnterprise){
        return smartphoneRepository.findByFabricante(idEnterprise);
    }
}
