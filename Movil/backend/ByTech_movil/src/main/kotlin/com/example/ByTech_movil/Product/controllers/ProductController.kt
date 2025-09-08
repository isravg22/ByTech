package com.example.ByTech_movil.Product.controllers

import com.example.ByTech_movil.Message.Message
import com.example.ByTech_movil.Product.models.Product
import com.example.ByTech_movil.Product.services.ProductService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider
import software.amazon.awssdk.regions.Region
import software.amazon.awssdk.services.s3.S3Client
import software.amazon.awssdk.services.s3.model.PutObjectRequest
import java.io.IOException
import java.text.DateFormat
import java.text.ParseException
import java.text.SimpleDateFormat
import java.util.*
import jakarta.validation.Valid


@RestController
@RequestMapping("/product")
@CrossOrigin(origins = ["exp://192.168.0.247:8081"])
class ProductController @Autowired constructor(private val productService: ProductService) {

    @Value("\${bucket.name}")
    private lateinit var bucketName: String

    @Value("\${client.id}")
    private lateinit var clientId: String

    @Value("\${secret.id}")
    private lateinit var secretId: String

    @GetMapping
    fun getProductos(): ResponseEntity<List<Product>> {
        val productos = productService.getProductos()
        return ResponseEntity(productos, HttpStatus.OK)
    }

    @GetMapping("/{product_id}")
    fun getProductById(@PathVariable("product_id") productId: Long): ResponseEntity<Any> {
        val productOptional = productService.getProductById(productId)
        return if (productOptional.isPresent) {
            ResponseEntity(productOptional.get(), HttpStatus.OK)
        } else {
            ResponseEntity(Message("No encontrado"), HttpStatus.NOT_FOUND)
        }
    }

    @GetMapping("/best")
    fun getBestProducts(): ResponseEntity<List<Product>> {
        val bestProducts = productService.getBestPriceProducts()
        return ResponseEntity(bestProducts, HttpStatus.OK)
    }

    @PostMapping("/insertProduct")
    fun saveProduct(
        @RequestParam("name") name: String,
        @RequestParam("description") description: String,
        @RequestParam("price") price: Double,
        @RequestParam("unidades") unidades: Long,
        @RequestParam("fabricante") fabricante: Long,
        @RequestParam("image") image: MultipartFile,
        @RequestParam("category") category: String,
        @RequestParam("date") dateString: String
    ): ResponseEntity<Any> {
        return try {
            val df: DateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSX")
            val date: Date = df.parse(dateString)

            val product = Product().apply {
                this.name = name
                this.description = description
                this.price = price
                this.unidades = unidades
                this.registradas = unidades
                this.fabricante = fabricante
                this.category = category
                this.date = date
                this.image = uploadImageToS3(image.originalFilename ?: "default.png", image.bytes)
            }

            ResponseEntity(productService.saveProduct(product), HttpStatus.CREATED)
        } catch (e: IOException) {
            ResponseEntity(Message("Error al guardar la imagen: ${e.message}"), HttpStatus.INTERNAL_SERVER_ERROR)
        } catch (e: ParseException) {
            ResponseEntity(Message("Formato de fecha inválido"), HttpStatus.BAD_REQUEST)
        } catch (e: Exception) {
            ResponseEntity(Message("Error: ${e.message}"), HttpStatus.BAD_REQUEST)
        }
    }

    @PutMapping("/update")
    fun updateProduct(
        @Valid @RequestBody product: Product,
        bindingResult: BindingResult
    ): ResponseEntity<Any> {
        if (bindingResult.hasErrors()) {
            return ResponseEntity(
                Message("Error de validación"),
                HttpStatus.BAD_REQUEST
            )
        }

        val productId = product.id
        if (productId == null) {
            return ResponseEntity(Message("El ID del producto es requerido"), HttpStatus.BAD_REQUEST)
        }

        val existingProductOpt = productService.getProductById(productId)
        if (!existingProductOpt.isPresent) {
            return ResponseEntity(Message("Producto no encontrado"), HttpStatus.NOT_FOUND)
        }

        val updatedProduct = productService.saveProduct(product)
        return ResponseEntity(updatedProduct, HttpStatus.OK)
    }


    @DeleteMapping("/delete/{product_id}")
    fun deleteProduct(@PathVariable("product_id") id: Long): ResponseEntity<Message> {
        return if (productService.deleteProduct(id)) {
            ResponseEntity(Message("Producto eliminado"), HttpStatus.OK)
        } else {
            ResponseEntity(Message("No se pudo eliminar el producto"), HttpStatus.BAD_REQUEST)
        }
    }

    private fun uploadImageToS3(imageName: String, imageBytes: ByteArray): String {
        val credentials = AwsBasicCredentials.create(clientId, secretId)
        val s3Client = S3Client.builder()
            .credentialsProvider(StaticCredentialsProvider.create(credentials))
            .region(Region.EU_WEST_1)
            .build()

        val putObjectRequest = PutObjectRequest.builder()
            .bucket(bucketName)
            .key(imageName)
            .build()

        s3Client.putObject(putObjectRequest, software.amazon.awssdk.core.sync.RequestBody.fromBytes(imageBytes))

        return imageName
    }
}
