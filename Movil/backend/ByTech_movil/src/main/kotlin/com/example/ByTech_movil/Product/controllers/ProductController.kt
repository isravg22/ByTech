package com.example.ByTech_movil.Product.controllers

import com.example.ByTech_movil.Message.Message
import com.example.ByTech_movil.Product.models.Product
import com.example.ByTech_movil.Product.services.ProductService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider
import software.amazon.awssdk.regions.Region
import software.amazon.awssdk.services.s3.S3Client
import software.amazon.awssdk.services.s3.model.GetUrlRequest
import software.amazon.awssdk.services.s3.model.PutObjectRequest
import java.io.ByteArrayInputStream
import java.io.IOException
import java.text.DateFormat
import java.text.ParseException
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Optional

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = ["exp://192.168.0.247:8081"])
class ProductController @Autowired constructor(productService: ProductService) {
    private val productService: ProductService = productService
    private val BUCKET_NAME = "s3-bytech"

    @get:GetMapping
    val productos: ResponseEntity<Any>
        get() {
            val productos: MutableList<Product?> = productService.productos
            return ResponseEntity<Any>(productos, HttpStatus.OK)
        }

    @GetMapping("/{product_id}")
    fun getProductById(@PathVariable("product_id") productId: String?): ResponseEntity<Any> {
        val productIdLong: Long? = productId?.toLongOrNull()
        if (productIdLong == null) {
            return ResponseEntity<Any>(
                Message("ID de producto no válido"),
                HttpStatus.BAD_REQUEST

            )
            println("id no valida")
        }

        val productOptional: Optional<Product?> = productService.getProductById(productIdLong!!)
        return if (productOptional.isPresent) {
            ResponseEntity<Any>(productOptional.get(), HttpStatus.OK)
        } else {
            ResponseEntity<Any>(
                Message("Producto no encontrado"),
                HttpStatus.NOT_FOUND
            )
        }
    }


    @get:GetMapping("/best")
    val bestProducts: ResponseEntity<Any>
        get() {
            val bestProducts: ArrayList<Product?>? = productService.bestPriceProducts
            return ResponseEntity<Any>(bestProducts, HttpStatus.OK)
        }

    @PostMapping(path = ["/insertProduct"])
    fun saveProduct(
        @RequestParam("name") name: String?,
        @RequestParam("description") description: String?,
        @RequestParam("price") price: Double?,
        @RequestParam("unidades") unidades: Long?,
        @RequestParam("fabricante") fabricante: Long?,
        @RequestParam("image") image: MultipartFile?,
        @RequestParam("category") category: String?,
        @RequestParam("date") dateString: String?
    ): Product {
        try {
            if (name == null || description == null || price == null || fabricante == null || image == null || image.isEmpty() || unidades == null || category == null || dateString == null) {
                throw RuntimeException("Por favor, completa todos los campos.")
            }
            val df: DateFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSX")
            val date: Date = df.parse(dateString)

            val product: Product = Product()
            product.name=name
            product.description=description
            product.price=price
            product.unidades=unidades
            product.fabricante=fabricante
            product.category=category
            product.date=date

            val imageBytes: ByteArray = image.bytes
            val imageName: String = image.originalFilename.toString()
            val imageUrl = uploadImageToS3(imageName, imageBytes)
            product.image=imageUrl


            return productService.saveProduct(product)
        } catch (e: IOException) {
            e.printStackTrace()
            throw RuntimeException("Error al guardar la imagen.")
        } catch (e: ParseException) {
            throw RuntimeException(e)
        }
    }

    @PutMapping("/update")
    fun updateProduct(
        @RequestBody product: Product?,
        bindingResult: BindingResult
    ): ResponseEntity<Message> {
        if (bindingResult.hasErrors()) return ResponseEntity<Message>(
            Message("Revise los campos"),

            HttpStatus.BAD_REQUEST
        )
        productService.saveProduct(product)
        return ResponseEntity<Message>(Message("Actualizado correctamente"), HttpStatus.OK)
    }

    @GetMapping("/type/{category}")
    fun getProductByCategory(@PathVariable("category") category: String?): ResponseEntity<Any> {
        val productsByCategory: ArrayList<Product?>? = productService.getProductByCategory(category)
        return ResponseEntity<Any>(productsByCategory, HttpStatus.OK)
    }

    @GetMapping("/unidadesTotales/{enterpriseId}")
    fun findByMonthAndEnterpriseId(@PathVariable("enterpriseId") enterpriseId: Long?): ResponseEntity<Any> {
        val unidadesTotales = ArrayList<Long>()
        for (month in 1..12) {
            val findByMonthAndEnterpriseId: Long? =
                productService.findByMonthAndEnterpriseId(month, enterpriseId)
            findByMonthAndEnterpriseId?.let { unidadesTotales.add(it) }
        }
        return ResponseEntity<Any>(unidadesTotales, HttpStatus.OK)
    }


    @GetMapping("/fabricante/{idEnterprise}")
    fun getProductByFabricante(@PathVariable idEnterprise: Long?): List<Product?>? {
        return productService.getProductByFabricante(idEnterprise)
    }

    @DeleteMapping(path = ["/{id}"])
    fun deleteOrdenadorById(@PathVariable("id") id: Long): String {
        val ok: Boolean = productService.deleteProduct(id)
        return if (ok) {
            "Ordenador with id $id deleted!"
        } else {
            "Error, we have a problem and can´t delete ordenador with id $id"
        }
    }


    private fun uploadImageToS3(imageName: String, imageBytes: ByteArray): String? {
        val accessKey = "Esta comentada la clave porque si no me deshabilitan mi cuenta cuando lo exponga va el valor que esta comentado"//"AKIA6ODUZLCDVXD3I6H7"
        val secretKey ="Esta comentada la clave porque si no me deshabilitan mi cuenta cuando lo exponga va el valor que esta comentado" //"YAni57ttllkPGAZ1bjNboeWAZ7faB8iA8VvqFI83"

        val awsCredentials: AwsBasicCredentials = AwsBasicCredentials.create(accessKey, secretKey)
        val credentialsProvider: StaticCredentialsProvider =
            StaticCredentialsProvider.create(awsCredentials)

        val s3Client: S3Client = S3Client.builder()
            .credentialsProvider(credentialsProvider)
            .region(Region.EU_WEST_3)
            .build()

        try {
            val imageStream: ByteArrayInputStream = ByteArrayInputStream(imageBytes)
            val requestBody: software.amazon.awssdk.core.sync.RequestBody? =
                software.amazon.awssdk.core.sync.RequestBody.fromBytes(imageBytes)
            s3Client.putObject(
                PutObjectRequest.builder()
                    .bucket(BUCKET_NAME)
                    .key(imageName)
                    .build(),
                requestBody
            )

            return s3Client.utilities()
                .getUrl(GetUrlRequest.builder().bucket(BUCKET_NAME).key(imageName).build())
                .toExternalForm()
        } catch (e: Exception) {
            e.printStackTrace()
            return null
        } finally {
            s3Client.close()
        }
    }
}
