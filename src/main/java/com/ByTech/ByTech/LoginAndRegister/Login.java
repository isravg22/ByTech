package com.ByTech.ByTech.LoginAndRegister;

import jakarta.persistence.*;

@Entity
public class Login {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idUser;

    private String userName;
    private String password;

    @ManyToOne
    @JoinColumn(name = "register")
    private Register register;



    public Login(String userName, String password,Register register) {
        this.userName = userName;
        this.password = password;
        this.register = register;
    }

    public Login() {
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
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

    public Register getRegister() {
        return register;
    }

    public void setRegister(Register register) {
        this.register = register;
    }
}
