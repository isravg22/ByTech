package com.ByTech.ByTech.Productos.Componentes.models;

import com.ByTech.ByTech.Fabricante.models.EnterpriseModel;
import jakarta.persistence.*;

@Entity
@Table(name = "components")
public class ComponentsModel {

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
