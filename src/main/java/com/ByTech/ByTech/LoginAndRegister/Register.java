package com.ByTech.ByTech.LoginAndRegister;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;


@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class Register {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idUser;

    private String name,stLastName,ndLastName,correo,userName,password;
    private int validated,admin,employee;

    public Register(String name, String stLastName, String ndLastName, String correo, String userName, String password, int validated, int admin, int employee) {
        this.name = name;
        this.stLastName = stLastName;
        this.ndLastName = ndLastName;
        this.correo = correo;
        this.userName = userName;
        this.password = password;
        this.validated = validated;
        this.admin = admin;
        this.employee = employee;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStLastName() {
        return stLastName;
    }

    public void setStLastName(String stLastName) {
        this.stLastName = stLastName;
    }

    public String getNdLastName() {
        return ndLastName;
    }

    public void setNdLastName(String ndLastName) {
        this.ndLastName = ndLastName;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getValidated() {
        return validated;
    }

    public void setValidated(int validated) {
        this.validated = validated;
    }

    public int getAdmin() {
        return admin;
    }

    public void setAdmin(int admin) {
        this.admin = admin;
    }

    public int getEmployee() {
        return employee;
    }

    public void setEmployee(int employee) {
        this.employee = employee;
    }
}
