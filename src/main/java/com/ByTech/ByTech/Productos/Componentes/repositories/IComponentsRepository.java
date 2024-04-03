package com.ByTech.ByTech.Productos.Componentes.repositories;

import com.ByTech.ByTech.Productos.Componentes.models.ComponentsModel;
import com.ByTech.ByTech.Productos.Ordenadores.models.OrdenadorModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IComponentsRepository extends JpaRepository<ComponentsModel,Long> {
}
