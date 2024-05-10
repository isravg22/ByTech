package com.ByTech.ByTech.Cart.services;

import com.ByTech.ByTech.Cart.models.Detail;
import com.ByTech.ByTech.Cart.models.Sale;
import com.ByTech.ByTech.Cart.models.ShoppingCart;
import com.ByTech.ByTech.Cart.repositories.SaleRepository;
import com.ByTech.ByTech.User.models.UserModel;
import com.ByTech.ByTech.User.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class SaleService {

    private final SaleRepository saleRepository;
    private final UserService userService;
    private final ShoppingCartService shoppingCartService;
    private final DetailService detailService;

    @Autowired
    public SaleService(SaleRepository saleRepository, UserService userService, ShoppingCartService shoppingCartService,
                       DetailService detailService) {
        this.saleRepository = saleRepository;
        this.userService = userService;
        this.shoppingCartService = shoppingCartService;
        this.detailService = detailService;
    }

    public List<Sale> getSalesByClient(String userName){
        return this.saleRepository.findByClient_UserName(userName);
    }

    public Sale createSale(String userName){
        try {
            UserModel client = this.userService.getByUserName(userName).get();
            List<ShoppingCart> shoppingCartList = this.shoppingCartService.getListByClient(client.getUserName());
            Double total = shoppingCartList.stream().mapToDouble(shoppingCartItem -> shoppingCartItem.getProduct().getPrice()
                    * shoppingCartItem.getAmount()).sum();
            Sale sale = new Sale(0.0, new Date(), client);
            sale = this.saleRepository.save(sale);
            for (ShoppingCart shoppingCart : shoppingCartList) {
                Detail detail = new Detail();
                detail.setProduct(shoppingCart.getProduct());
                detail.setAmount(shoppingCart.getAmount());
                detail.setSale(sale);
                this.detailService.createDetail(detail);
            }
            sale.setTotal(total);
            sale = this.saleRepository.save(sale);
            this.shoppingCartService.cleanShoppingCart(client.getId());
            return sale;
        } catch (Exception e) {
            throw new RuntimeException("Error creating sale", e);
        }
    }
}
