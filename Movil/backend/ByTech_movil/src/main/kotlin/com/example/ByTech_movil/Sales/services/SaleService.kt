package com.example.ByTech_movil.Sales.services

import com.example.ByTech_movil.Sales.models.Sale
import com.example.ByTech_movil.Sales.repositories.SaleRepository
import com.example.ByTech_movil.ShoppingCart.models.ShoppingCart
import com.example.ByTech_movil.ShoppingCart.services.ShoppingCartService
import com.example.ByTech_movil.User.models.UserModel
import com.example.ByTech_movil.User.services.UserService
import com.example.ByTech_movil.Detail.services.DetailService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.Date

@Service
@Transactional
class SaleService @Autowired constructor(
    saleRepository: SaleRepository,
    userService: UserService,
    shoppingCartService: ShoppingCartService,
    detailService: DetailService
) {
    private val saleRepository: SaleRepository = saleRepository
    private val userService: UserService = userService
    private val shoppingCartService: ShoppingCartService = shoppingCartService
    private val detailService: DetailService = detailService

    fun getSalesByClient(userName: String?): List<Sale?>? {
        return saleRepository.findByClient_UserName(userName)
    }

    fun createSale(userName: String?): Sale {
        try {
            val client: UserModel = userService.getByUserName(userName)!!.get()
            val shoppingCartList: List<ShoppingCart?>? = shoppingCartService.getListByClient(client.userName)
            val total = shoppingCartList?.stream()?.mapToDouble({ shoppingCartItem-> shoppingCartItem?.product?.price!! * shoppingCartItem?.amount!! })?.sum()
            var sale: Sale = Sale(0.0, Date(), client)
            sale = saleRepository.save(sale)
            for (shoppingCart in shoppingCartList!!) {
                val detail: com.example.ByTech_movil.Detail.models.Detail =
                    com.example.ByTech_movil.Detail.models.Detail()
                detail.product=shoppingCart?.product
                detail.amount= shoppingCart!!.amount
                detail.sale=sale
                detailService.createDetail(detail)
            }
            sale.total=total
            sale = saleRepository.save(sale)
            shoppingCartService.cleanShoppingCart(client.id)
            return sale
        } catch (e: Exception) {
            throw RuntimeException("Error creating sale", e)
        }
    }

    fun getSalesByMonth(month: Int): List<Sale?>? {
        return saleRepository.findByMonth(month)
    }
}
