package com.ByTech.ByTech.Fabricante.models;

import com.ByTech.ByTech.User.models.UserModel;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "Enterprise")
public class EnterpriseModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "nif")
    private String nif;

    @Column
    private Long boss;

    @ElementCollection
    private List<Long> workers;


    // Getters y setters

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
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getNif() {
        return nif;
    }

    public void setNif(String nif) {
        this.nif = nif;
    }

    public Long getBoss() {
        return boss;
    }

    public void setBoss(Long boss) {
        this.boss = boss;
    }

    public List<Long> getWorkers() {
        return workers;
    }

    public void setWorkers(List<Long> workers) {
        this.workers = workers;
    }


    @Override
    public String toString() {
        return "EnterpriseModel{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", nif='" + nif + '\'' +
                ", boss=" + boss +
                ", workers=" + workers +
                '}';
    }
}
