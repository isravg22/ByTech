package com.example.ByTech_movil.Sales.services

import com.example.ByTech_movil.Detail.models.Detail
import com.example.ByTech_movil.Sales.models.Sale
import com.example.ByTech_movil.Detail.services.DetailService
import com.example.ByTech_movil.ShoppingCart.models.ShoppingCart
import com.example.ByTech_movil.Sales.repositories.SaleRepository
import com.example.ByTech_movil.ShoppingCart.services.ShoppingCartService
import com.example.ByTech_movil.User.models.UserModel
import com.example.ByTech_movil.User.services.UserService
import com.example.ByTech_movil.Product.models.Product
import com.example.ByTech_movil.Product.repositories.ProductRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*

@Service
@Transactional
class SaleService @Autowired constructor(
    private val saleRepository: SaleRepository,
    private val productRepository: ProductRepository,
    private val userService: UserService,
    private val shoppingCartService: ShoppingCartService,
    private val detailService: DetailService
) {

    fun getSalesByClient(userName: String): List<Sale> {
        return saleRepository.findByClient_UserName(userName)
    }

    fun getSalesByMonth(month: Int): List<Sale> {
        return saleRepository.findByMonth(month)
    }

    fun createSale(userName: String): Sale {
        val client: UserModel = userService.getByUserName(userName)
            .orElseThrow { IllegalArgumentException("Usuario no encontrado") }

        val shoppingCartList: List<ShoppingCart> =
            shoppingCartService.getListByClient(client.userName!!).toList()

        val total: Double = shoppingCartList.sumOf { item ->
            val product = item.product ?: throw IllegalArgumentException("Producto nulo en carrito")
            val price = product.price ?: 0.0
            price * item.amount
        }

        val sale = Sale(
            total = total,
            date = Date(),
            client = client
        )

        val savedSale = saleRepository.save(sale)

        for (item in shoppingCartList) {
            val product: Product = item.product ?: continue
            val cantidadVendida = item.amount

            val unidades = product.unidades ?: 0
            if (unidades < cantidadVendida) {
                throw IllegalArgumentException("No hay suficiente stock del producto ${product.name}")
            }

            product.unidades = unidades - cantidadVendida
            productRepository.save(product)

            val detail = Detail()
            detail.amount = cantidadVendida
            detail.sale = savedSale
            detail.product = product
            detailService.createDetail(detail)
        }

        shoppingCartService.cleanShoppingCart(client.id)

        return savedSale
    }
}
