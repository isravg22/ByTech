package com.example.ByTech_movil.Product.services

import com.example.ByTech_movil.Product.models.Product
import com.example.ByTech_movil.Product.repositories.ProductRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.Optional
import java.util.Random

@Service
@Transactional
class ProductService @Autowired constructor(productRepository: ProductRepository) {
    private val productRepository: ProductRepository = productRepository

    fun getRelatedProducts(category: String?, productId: Long?): ArrayList<Product> {
        val productList: ArrayList<Product?>? = productRepository.findByCategoryAndIdNot(category, productId)
        val randomProducts: ArrayList<Product> = ArrayList<Product>()
        val random = Random()
        for (i in 0..1) {
            val randomIndex = random.nextInt(productList!!.size)
            randomProducts.add(productList[randomIndex]!!)
            productList.removeAt(randomIndex)
        }
        return randomProducts
    }

    fun saveProduct(product: Product?): Product {
        return productRepository.save(product!!)
    }

    fun getProductById(id: Long): Optional<Product?> {
        return productRepository.findById(id)
    }

    val bestPriceProducts: ArrayList<Product?>?
        get() = productRepository.findFirst4ByOrderByPriceAsc()

    val productos: MutableList<Product?>
        get() = productRepository.findAll()

    fun getProductByCategory(category: String?): ArrayList<Product?>? {
        return productRepository.findByCategory(category)
    }

    fun findByMonthAndEnterpriseId(month: Int, enterpriseId: Long?): Long? {
        return productRepository.findByMonthAndEnterpriseId(month, enterpriseId)
    }

    fun getProductByFabricante(idEnterprise: Long?): List<Product?>? {
        return productRepository.findByFabricante(idEnterprise)
    }

    fun deleteProduct(id: Long?): Boolean {
        if (id == null) return false
        try {
            productRepository.deleteById(id)
            return true
        } catch (e: Exception) {
            return false
        }
    }
}