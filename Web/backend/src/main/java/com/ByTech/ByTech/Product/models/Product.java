package com.ByTech.ByTech.Product.models;

import jakarta.persistence.*;
import java.util.Date;

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
    private Long fabricante;
    @Column
    private Long vendidas = 0L;
    @Column
    private Long registradas; 

    @Column(columnDefinition = "DATE")
    private Date date;



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

    public Long getFabricante() {
        return fabricante;
    }

    public void setFabricante(Long fabricante) {
        this.fabricante = fabricante;
    }

    public Long getVendidas() {
        return vendidas;
    }

    public void setVendidas(Long vendidas) {
        this.vendidas = vendidas;
    }

    public Long getRegistradas() {
        return registradas;
    }

    public void setRegistradas(Long registradas) {
        this.registradas = registradas;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}