package com.ByTech.ByTech.Productos.Smartphones.repositories;

import com.ByTech.ByTech.Productos.Smartphones.models.SmartphoneModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ISmartphoneRepository extends JpaRepository<SmartphoneModel,Long> {
}
