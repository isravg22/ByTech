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

    public Register(String name, String stLastName, String ndLastName, String correo, String userName, String password) {
        this.name = name;
        this.stLastName = stLastName;
        this.ndLastName = ndLastName;
        this.correo = correo;
        this.userName = userName;
        this.password = password;
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

}
