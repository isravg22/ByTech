package com.ByTech.ByTech.Productos.Ordenadores.repositories;

import com.ByTech.ByTech.Productos.Ordenadores.models.OrdenadorModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IOrdenadorRepository extends JpaRepository<OrdenadorModel,Long> {
    List<OrdenadorModel> findByFabricante(Long idEnterprise);
}
