package com.ByTech.ByTech.Cart.services;

import com.ByTech.ByTech.Cart.models.Message;
import com.ByTech.ByTech.Cart.models.ShoppingCart;
import com.ByTech.ByTech.Cart.repositories.ShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ShoppingCartService {

    private final ShoppingCartRepository shoppingCartRepository;

    @Autowired
    public ShoppingCartService(ShoppingCartRepository shoppingCartRepository) {
        this.shoppingCartRepository = shoppingCartRepository;
    }

    public List<ShoppingCart> getListByClient(String userName){
        return this.shoppingCartRepository.findByClient_UserName(userName);
    }

    public ShoppingCart findByClientAndProduct(String userName, Long productId) {
        return this.shoppingCartRepository.findByClient_UserNameAndProduct_Id(userName, productId);
    }


    public void cleanShoppingCart(Long clientId){
        this.shoppingCartRepository.deleteByClient_Id(clientId);
    }

    public void removeProduct(Long id){
        this.shoppingCartRepository.deleteById(id);
    }

    public ResponseEntity<Message> addProduct(ShoppingCart shoppingCart) {
        ShoppingCart existingItem = findByClientAndProduct(shoppingCart.getClient().getUserName(), shoppingCart.getProduct().getId());
        
        if (existingItem != null) {
            // Si el producto ya existe en el carrito, se suma la cantidad
            existingItem.setAmount(existingItem.getAmount() + shoppingCart.getAmount());
            updateProduct(existingItem); // Actualiza la cantidad del producto en el carrito
            System.out.println("Cantidad de producto actualizada: " + existingItem.getAmount());
            return new ResponseEntity<>(new Message("Cantidad de producto actualizada"), HttpStatus.OK);
        } else {
            addNewProduct(shoppingCart); // Agrega un nuevo item al carrito
            System.out.println("Producto agregado al carrito: " + shoppingCart.getProduct().getName() + " - Cantidad: " + shoppingCart.getAmount());
            return new ResponseEntity<>(new Message("Producto agregado al carrito"), HttpStatus.OK);
        }
    }

    private void addNewProduct(ShoppingCart shoppingCart) {
        this.shoppingCartRepository.save(shoppingCart);
    }

    public void updateProduct(ShoppingCart shoppingCart){
        this.shoppingCartRepository.save(shoppingCart);
    }

    public Long getCountByClient(Long clientId){
        return this.shoppingCartRepository.countByClient_Id(clientId);
    }

    public ShoppingCart updateByID(ShoppingCart request, Long id ){
        ShoppingCart shoppingCart = shoppingCartRepository.findById(id).orElse(null);
        if(shoppingCart != null) {
            shoppingCart.setAmount(request.getAmount());
            shoppingCart.setClient(request.getClient());
            shoppingCart.setProduct(request.getProduct());

            shoppingCartRepository.save(shoppingCart);
        }
        return shoppingCart;
    }

    public ShoppingCart findById(Long id) {
        return shoppingCartRepository.findById(id).orElse(null);
    }
}
