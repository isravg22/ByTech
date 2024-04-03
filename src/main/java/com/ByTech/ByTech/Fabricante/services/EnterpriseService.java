package com.ByTech.ByTech.Fabricante.services;

import com.ByTech.ByTech.Fabricante.models.EnterpriseModel;
import com.ByTech.ByTech.Fabricante.repositories.IEnterpriseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class EnterpriseService {

    @Autowired
    IEnterpriseRepository enterpriseRepository;

    public ArrayList<EnterpriseModel> getEnterprise(){
        return (ArrayList<EnterpriseModel>) enterpriseRepository.findAll();
    }

    public EnterpriseModel saveEnterprise(EnterpriseModel enterprise){
        return  enterpriseRepository.save(enterprise);
    }

    public Optional<EnterpriseModel> getById(Long id){
        return enterpriseRepository.findById(id);
    }

    public EnterpriseModel updateByID(EnterpriseModel request,Long id){
        EnterpriseModel enterpriseModel = enterpriseRepository.findById(id).get();

        enterpriseModel.setNIF(request.getNIF());
        enterpriseModel.setNombre(request.getNombre());
        enterpriseModel.setBoss(request.getBoss());
        enterpriseModel.setWorkers(request.getWorkers());
        enterpriseModel.setDescripcion(request.getDescripcion());

        enterpriseRepository.save(enterpriseModel);

        return enterpriseModel;
    }

    public Boolean deleteEnterprise(Long id){
        try{
            enterpriseRepository.deleteById(id);
            return true;
        }catch (Exception e){
            return false;
        }
    }
}
