package com.ByTech.ByTech.Cart.services;

import com.ByTech.ByTech.Cart.models.Product;
import com.ByTech.ByTech.Cart.repositories.ProductRepository;
import com.ByTech.ByTech.Productos.Ordenadores.models.OrdenadorModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;


@Service
@Transactional
public class ProductService {
    private final ProductRepository productRepository;
    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    public ArrayList<Product> getRelatedProducts(String category, Long productId){
        ArrayList<Product> productList =
                this.productRepository.
                        findByCategoryAndIdNot(category,productId);
        ArrayList<Product> randomProducts = new ArrayList<>();
        Random random = new Random();
        for(int i = 0; i < 2; i++){
            int randomIndex = random.nextInt(productList.size());
            randomProducts.add(productList.get(randomIndex));
            productList.remove(randomIndex);
        }
        return randomProducts;
    }
    public void saveProduct(Product product){
        this.productRepository.save(product);
    }

    public Optional<Product> getProductById(String id){
        return this.productRepository.findById(id);
    }
    public ArrayList<Product> getBestPriceProducts(){
        return this.productRepository.findFirst4ByOrderByPriceAsc();
    }

    public ArrayList<Product> getProductos(){
        return (ArrayList<Product>) productRepository.findAll();
    }

    public ArrayList<Product> getProductByCategory(String category){
        return this.productRepository.findByCategory(category);
    }
}