package com.ByTech.ByTech.Productos.Ordenadores.repositories;

import com.ByTech.ByTech.Productos.Ordenadores.models.OrdenadorModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrdenadorRepository extends JpaRepository<OrdenadorModel,Long> {
}
