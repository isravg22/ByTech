package com.ByTech.ByTech.Cart.models;

import com.ByTech.ByTech.Fabricante.models.EnterpriseModel;
import jakarta.persistence.*;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @Column
    private Double price;
    @Column
    private String description;
    @Column
    private String category;
    @Column
    private String image;
    @Column
    private Long unidades;
    @Column
    private Long enterprise_id;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Long getUnidades() {
        return unidades;
    }

    public void setUnidades(Long unidades) {
        this.unidades = unidades;
    }

    public Long getEnterprise_id() {
        return enterprise_id;
    }

    public void setEnterprise_id(Long enterprise_id) {
        this.enterprise_id = enterprise_id;
    }
}