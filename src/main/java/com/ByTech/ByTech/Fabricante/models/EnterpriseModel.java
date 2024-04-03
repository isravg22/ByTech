package com.ByTech.ByTech.Fabricante.models;

import com.ByTech.ByTech.User.models.UserModel;
import jakarta.persistence.*;
import org.apache.catalina.User;

import java.util.ArrayList;

@Entity
@Table(name = "Enterprise")
public class EnterpriseModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nombre;
    @Column
    private String descripcion;

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    @Column
    private String NIF;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserModel Boss;

    @Column
    private ArrayList<UserModel> workers;

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

    public String getNIF() {
        return NIF;
    }

    public void setNIF(String NIF) {
        this.NIF = NIF;
    }

    public UserModel getBoss() {
        return Boss;
    }

    public void setBoss(UserModel boss) {
        Boss = boss;
    }

    public ArrayList<UserModel> getWorkers() {
        return workers;
    }

    public void setWorkers(ArrayList<UserModel> workers) {
        this.workers = workers;
    }
}
