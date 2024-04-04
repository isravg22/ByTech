package com.ByTech.ByTech.Productos.Gaming.services;

import com.ByTech.ByTech.Productos.Gaming.models.GamingModel;
import com.ByTech.ByTech.Productos.Gaming.repositories.IGamingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Optional;

@Service
public class GamingService {

    @Autowired
    IGamingRepository gamingRepository;

    public ArrayList<GamingModel> getGaming(){
        return (ArrayList<GamingModel>) gamingRepository.findAll();
    }

    public GamingModel saveGaming(GamingModel gaming){
        return  gamingRepository.save(gaming);
    }

    public Optional<GamingModel> getByID(Long id){
        return gamingRepository.findById(id);
    }

    public GamingModel updateByID(GamingModel request, Long id){
        GamingModel gamingModel = gamingRepository.findById(id).get();

        gamingModel.setNombre(request.getNombre());
        gamingModel.setDescripcion(request.getDescripcion());
        gamingModel.setPrecio(request.getPrecio());
        gamingModel.setUnidades(request.getUnidades());
        gamingModel.setFabricante(request.getFabricante());
        gamingModel.setImage(request.getImage());

        gamingRepository.save(gamingModel);

        return gamingModel;
    }

    public  Boolean deleteGaming(Long id){
        try{
            gamingRepository.deleteById(id);
            return true;
        }catch (Exception e){
            return false;
        }
    }

}
