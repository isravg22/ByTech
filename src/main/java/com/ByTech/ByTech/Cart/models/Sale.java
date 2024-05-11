package com.ByTech.ByTech.Cart.models;

import com.ByTech.ByTech.User.models.UserModel;
import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Double total;

    @Column(columnDefinition = "DATE")
    private Date date;

    @ManyToOne(optional = false, cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
    private UserModel client;

    public Sale() {
    }

    public Sale(Double total, Date date, UserModel client) {
        this.total = total;
        this.date = date;
        this.client = client;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public UserModel getClient() {
        return client;
    }

    public void setClient(UserModel client) {
        this.client = client;
    }
}
