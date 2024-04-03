package com.ByTech.ByTech.Productos.Gaming.repositories;

import com.ByTech.ByTech.Productos.Gaming.models.GamingModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IGamingRepository extends JpaRepository<GamingModel,Long> {
}
