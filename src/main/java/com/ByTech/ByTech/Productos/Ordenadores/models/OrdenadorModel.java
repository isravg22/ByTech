package com.ByTech.ByTech.Productos.Ordenadores.models;

import com.ByTech.ByTech.Fabricante.models.EnterpriseModel;
import jakarta.persistence.*;

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
    @ManyToOne
    @JoinColumn(name = "fabricante_id")
    private EnterpriseModel fabricante;

    @Column
    private Double precio;
    @Column
    private Long unidades;

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public Long getUnidades() {
        return unidades;
    }

    public void setUnidades(Long unidades) {
        this.unidades = unidades;
    }

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

    public EnterpriseModel getFabricante() {
        return fabricante;
    }

    public void setFabricante(EnterpriseModel fabricante) {
        this.fabricante = fabricante;
    }
}
