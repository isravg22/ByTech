package com.ByTech.ByTech.User.models;

import com.ByTech.ByTech.Fabricante.models.EnterpriseModel;
import jakarta.persistence.*;

@Entity
@Table(name="user")
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "rol")
    private String rol;

    @Column(name = "activated")
    private int activated;

    @Column(name = "user_name")
    private String userName;

    @Column (name = "enterprise")
    private Long enterprise;

    // Getters y setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public int getActivated() {
        return activated;
    }

    public void setActivated(int activated) {
        this.activated = activated;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getEnterprise() {
        return enterprise;
    }

    public void setEnterprise(Long enterprise) {
        this.enterprise = enterprise;
    }
}
