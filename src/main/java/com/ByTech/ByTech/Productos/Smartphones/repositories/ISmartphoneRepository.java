package com.ByTech.ByTech.Productos.Smartphones.repositories;

import com.ByTech.ByTech.Productos.Ordenadores.models.OrdenadorModel;
import com.ByTech.ByTech.Productos.Smartphones.models.SmartphoneModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ISmartphoneRepository extends JpaRepository<SmartphoneModel,Long> {
    List<SmartphoneModel> findByFabricante(Long idEnterprise);
}
