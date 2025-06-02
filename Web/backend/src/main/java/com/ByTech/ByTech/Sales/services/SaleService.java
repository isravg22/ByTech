package com.ByTech.ByTech.Sales.services;

import com.ByTech.ByTech.Detail.models.Detail;
import com.ByTech.ByTech.Sales.models.Sale;
import com.ByTech.ByTech.Detail.services.DetailService;
import com.ByTech.ByTech.ShoppingCart.models.ShoppingCart;
import com.ByTech.ByTech.Sales.repositories.SaleRepository;
import com.ByTech.ByTech.ShoppingCart.services.ShoppingCartService;
import com.ByTech.ByTech.User.models.UserModel;
import com.ByTech.ByTech.User.services.UserService;
import com.ByTech.ByTech.Product.models.Product;
import com.ByTech.ByTech.Product.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class SaleService {
    private final SaleRepository saleRepository;
    private final ProductRepository productRepository;
    private final UserService userService;
    private final ShoppingCartService shoppingCartService;
    private final DetailService detailService;

    @Autowired
    public SaleService(
        SaleRepository saleRepository,
        ProductRepository productRepository,
        UserService userService,
        ShoppingCartService shoppingCartService,
        DetailService detailService
    ) {
        this.saleRepository = saleRepository;
        this.productRepository = productRepository;
        this.userService = userService;
        this.shoppingCartService = shoppingCartService;
        this.detailService = detailService;
    }

    public List<Sale> getSalesByClient(String userName){
        return this.saleRepository.findByClient_UserName(userName);
    }

    public Sale createSale(String userName) {
        UserModel client = userService.getByUserName(userName).orElseThrow();
        List<ShoppingCart> shoppingCartList = shoppingCartService.getListByClient(client.getUserName());
        Double total = shoppingCartList.stream()
            .mapToDouble(item -> item.getProduct().getPrice() * item.getAmount())
            .sum();
        Sale sale = new Sale(0.0, new Date(), client);
        sale = saleRepository.save(sale);

        for (ShoppingCart shoppingCart : shoppingCartList) {
            Product product = productRepository.findById(shoppingCart.getProduct().getId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
            Long cantidadVendida = (long) Integer.parseInt(""+shoppingCart.getAmount());

            // RESTAR STOCK
            if (product.getUnidades() != null && product.getUnidades() >= cantidadVendida) {
                product.setUnidades(product.getUnidades() - cantidadVendida);

                // SUMAR AL CAMPO VENDIDAS
                Long vendidasActual = product.getVendidas() != null ? product.getVendidas() : 0L;
                product.setVendidas(vendidasActual + cantidadVendida);

                productRepository.save(product);
            } else {
                throw new RuntimeException("No hay suficiente stock para el producto: " + product.getName());
            }

            // Crear detalle de venta
            Detail detail = new Detail();
            detail.setProduct(product);
            detail.setAmount((int) Integer.parseInt(""+cantidadVendida));
            detail.setSale(sale);
            detailService.createDetail(detail);
        }

        sale.setTotal(total);
        sale = saleRepository.save(sale);
        shoppingCartService.cleanShoppingCart(client.getId());
        return sale;
    }

    public List<Sale> getSalesByMonth(int month) {
        return this.saleRepository.findByMonth(month);
    }
}
