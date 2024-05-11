package com.ByTech.ByTech.Cart.services;

import com.ByTech.ByTech.Cart.models.Product;
import com.ByTech.ByTech.Cart.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;


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
    public Product saveProduct(Product product){
        return this.productRepository.save(product);
    }

    public Optional<Product> getProductById(Long id){
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

    public Long findByMonthAndEnterpriseId(int month, Long enterpriseId) {
        return this.productRepository.findByMonthAndEnterpriseId(month, enterpriseId);
    }

    public List<Product> getProductByFabricante(Long idEnterprise){
        return productRepository.findByFabricante(idEnterprise);
    }

    public  Boolean deleteProduct(Long id){
        try{
            productRepository.deleteById(id);
            return true;
        }catch (Exception e){
            return false;
        }
    }

}