package com.ByTech.ByTech.Fabricante.services;

import com.ByTech.ByTech.Fabricante.models.EnterpriseModel;
import com.ByTech.ByTech.Fabricante.repositories.IEnterpriseRepository;
import com.ByTech.ByTech.User.models.UserModel;
import com.ByTech.ByTech.User.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class EnterpriseService {

    @Autowired
    IEnterpriseRepository enterpriseRepository;
    @Autowired
    IUserRepository userRepository;

    public ArrayList<EnterpriseModel> getEnterprise() {
        return (ArrayList<EnterpriseModel>) enterpriseRepository.findAll();
    }

    public EnterpriseModel saveEnterprise(EnterpriseModel enterprise) throws Exception {
        if (existsByNombre(enterprise.getNombre())) {
            throw new Exception("Enterprise already exists");
        }
        return enterpriseRepository.save(enterprise);
    }

    public Optional<EnterpriseModel> getById(Long id) {
        return enterpriseRepository.findById(id);
    }

    public EnterpriseModel updateByID(EnterpriseModel request, Long id) throws Exception {
        EnterpriseModel enterpriseModel = enterpriseRepository.findById(id).orElseThrow(() -> new Exception("Enterprise not found"));

        if (!enterpriseModel.getNombre().equals(request.getNombre()) && existsByNombre(request.getNombre())) {
            throw new Exception("Enterprise already exists");
        }

        enterpriseModel.setNif(request.getNif());
        enterpriseModel.setNombre(request.getNombre());
        enterpriseModel.setBoss(request.getBoss());
        enterpriseModel.setDescripcion(request.getDescripcion());
        enterpriseModel.setWorkers(request.getWorkers());

        return enterpriseRepository.save(enterpriseModel);
    }

    public Boolean deleteEnterprise(Long id) {
        try {
            enterpriseRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean existsByNombre(String nombre) {
        return enterpriseRepository.existsByNombre(nombre);
    }

}
