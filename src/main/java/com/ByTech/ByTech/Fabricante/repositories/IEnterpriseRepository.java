package com.ByTech.ByTech.Fabricante.repositories;

import com.ByTech.ByTech.Fabricante.models.EnterpriseModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IEnterpriseRepository extends JpaRepository<EnterpriseModel,Long> {
}
