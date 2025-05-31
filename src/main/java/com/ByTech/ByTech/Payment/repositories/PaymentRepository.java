package com.ByTech.ByTech.Payment.repositories;

import com.ByTech.ByTech.Payment.models.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findAllByOrderByCreatedAtDesc();
    List<Payment> findAllByEnterpriseIdOrderByCreatedAtDesc(Long enterpriseId);
}