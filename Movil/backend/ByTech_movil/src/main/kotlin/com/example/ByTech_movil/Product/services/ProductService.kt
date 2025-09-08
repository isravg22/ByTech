package com.example.ByTech_movil.Product.services

import com.example.ByTech_movil.Product.models.Product
import com.example.ByTech_movil.Product.repositories.ProductRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*

@Service
@Transactional
class ProductService @Autowired constructor(private val productRepository: ProductRepository) {

    fun getRelatedProducts(category: String, productId: Long): ArrayList<Product> {
        val productList = productRepository.findByCategoryAndIdNot(category, productId) ?: arrayListOf()
        val randomProducts = ArrayList<Product>()
        val random = Random()

        if (productList.isNotEmpty()) {
            for (i in 0..1) {
                if (productList.isEmpty()) break
                val randomIndex = random.nextInt(productList.size)
                randomProducts.add(productList[randomIndex]!!)
                productList.removeAt(randomIndex)
            }
        }
        return randomProducts
    }

    fun saveProduct(product: Product): Product = productRepository.save(product)

    fun getProductById(id: Long): Optional<Product> = productRepository.findById(id)

    fun getBestPriceProducts(): ArrayList<Product> = ArrayList(productRepository.findFirst4ByOrderByPriceAsc() ?: listOf())

    fun getProductos(): ArrayList<Product> = ArrayList(productRepository.findAll().filterNotNull())

    fun getProductByCategory(category: String): ArrayList<Product> = ArrayList(productRepository.findByCategory(category) ?: listOf())

    fun findByMonthAndEnterpriseId(month: Int, enterpriseId: Long): Long =
        productRepository.findByMonthAndEnterpriseId(month, enterpriseId) ?: 0

    fun getProductByFabricante(idEnterprise: Long): List<Product> = productRepository.findByFabricante(idEnterprise)?.filterNotNull() ?: listOf()

    fun deleteProduct(id: Long): Boolean {
        return try {
            productRepository.deleteById(id)
            true
        } catch (e: Exception) {
            false
        }
    }

    fun getUnidadesVendidasPorMes(enterpriseId: Long): List<Map<String, Any>> =
        productRepository.findVendidasPorMes(enterpriseId)?.map { it as Map<String, Any> } ?: listOf()

    fun getTotalRegistradas(enterpriseId: Long): Long =
        productRepository.findTotalRegistradas(enterpriseId) ?: 0

    fun getTotalRestantes(enterpriseId: Long): Long =
        productRepository.findTotalRestantes(enterpriseId) ?: 0

    fun getTotalDinero(enterpriseId: Long): Double =
        productRepository.findTotalDinero(enterpriseId) ?: 0.0

    fun getDineroPorMes(enterpriseId: Long): List<Map<String, Any>> =
        productRepository.findDineroPorMes(enterpriseId)?.map { it as Map<String, Any> } ?: listOf()
}
