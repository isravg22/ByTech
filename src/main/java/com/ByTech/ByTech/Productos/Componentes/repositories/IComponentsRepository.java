package com.ByTech.ByTech.Productos.Componentes.repositories;

import com.ByTech.ByTech.Productos.Componentes.models.ComponentsModel;
import com.ByTech.ByTech.Productos.Ordenadores.models.OrdenadorModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IComponentsRepository extends JpaRepository<ComponentsModel,Long> {
    List<ComponentsModel> findByFabricante(Long idEnterprise);
}
