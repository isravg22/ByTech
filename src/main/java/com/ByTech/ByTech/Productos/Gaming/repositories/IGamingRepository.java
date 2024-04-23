package com.ByTech.ByTech.Productos.Gaming.repositories;

import com.ByTech.ByTech.Productos.Gaming.models.GamingModel;
import com.ByTech.ByTech.Productos.Ordenadores.models.OrdenadorModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IGamingRepository extends JpaRepository<GamingModel,Long> {
    List<GamingModel> findByFabricante(Long idEnterprise);
}
