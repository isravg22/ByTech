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

    @ManyToOne
    @JoinColumn(name = "boss_id")
    private UserModel boss;

    @OneToMany(mappedBy = "enterprise")
    private List<UserModel> workers;

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

    public UserModel getBoss() {
        return boss;
    }

    public void setBoss(UserModel boss) {
        this.boss = boss;
    }

    public List<UserModel> getWorkers() {
        return workers;
    }

    public void setWorkers(List<UserModel> workers) {
        this.workers = workers;
    }
}
