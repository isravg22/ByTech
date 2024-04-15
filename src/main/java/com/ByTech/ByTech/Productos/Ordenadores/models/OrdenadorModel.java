package com.ByTech.ByTech.Productos.Ordenadores.models;

import com.ByTech.ByTech.Fabricante.models.EnterpriseModel;
import jakarta.persistence.*;

import java.util.Base64;

@Entity
@Table(name = "ordenador")
public class OrdenadorModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nombre;
    @Column
    private String Descripcion;

    @Column
    private Long fabricante;

    @Column
    private Double precio;

    @Column
    private int unidades;
    @Lob
    private byte[] image;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return Descripcion;
    }

    public void setDescripcion(String descripcion) {
        Descripcion = descripcion;
    }

    public Long getFabricante() {
        return fabricante;
    }

    public void setFabricante(Long fabricante) {
        this.fabricante = fabricante;
    }
    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public int getUnidades() {
        return unidades;
    }

    public void setUnidades(int unidades) {
        this.unidades = unidades;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
