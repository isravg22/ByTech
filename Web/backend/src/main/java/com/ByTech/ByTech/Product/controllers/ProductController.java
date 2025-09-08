package com.ByTech.ByTech.Product.controllers;

import com.ByTech.ByTech.Message.Message;
import com.ByTech.ByTech.Product.models.Product;
import com.ByTech.ByTech.Product.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001"})
public class ProductController {
    private final ProductService productService;
    @Value("${bucket.name}")
    private String bucketName;
    @Value("${client.id}")
    private String clientId;
    @Value("${secret.id}")
    private String secretId;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<Object> getProductos(){
        ArrayList<Product> productos = this.productService.getProductos();
        return new ResponseEntity<>(productos, HttpStatus.OK);
    }

    @GetMapping("/{product_id}")
    public ResponseEntity<Object> getProductById(@PathVariable("product_id") Long productId) {
        Optional<Product> productOptional = productService.getProductById(productId);
        if (productOptional.isPresent()) {
            return new ResponseEntity<>(productOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Message("No encontrado"), HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/best")
    public ResponseEntity<Object> getBestProducts(){
        ArrayList<Product> bestProducts = this.productService.getBestPriceProducts();
        return new ResponseEntity<>(bestProducts,HttpStatus.OK);
    }

    @PostMapping(path = "/insertProduct")
    public Product saveProduct(@RequestParam("name") String name,
                                         @RequestParam("description") String description,
                                         @RequestParam("price") Double price,
                                         @RequestParam("unidades") Long unidades,
                                         @RequestParam("fabricante") Long fabricante,
                                         @RequestParam("image") MultipartFile image,
                                         @RequestParam("category") String category,
                               @RequestParam("date") String dateString) {
        try {
            if (name == null || description == null || price == null || fabricante == null || image == null || image.isEmpty() || unidades==null|| category==null||dateString==null) {
                throw new RuntimeException("Por favor, completa todos los campos.");
            }
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSX");
            Date date = df.parse(dateString);

            Product product = new Product();
            product.setName(name);
            product.setDescription(description);
            product.setPrice(price);
            product.setUnidades(unidades);
            product.setRegistradas(unidades); 
            product.setFabricante(fabricante);
            product.setCategory(category);
            product.setDate(date);

            byte[] imageBytes = image.getBytes();
            String imageName = image.getOriginalFilename();
            String imageUrl = uploadImageToS3(imageName, imageBytes);
            product.setImage(imageUrl);


            return this.productService.saveProduct(product);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Error al guardar la imagen.");
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

    }

    @PutMapping("/update")
    public ResponseEntity<Message> updateProduct(@RequestBody Product product, BindingResult bindingResult){
        if (bindingResult.hasErrors())
            return new ResponseEntity<>(new Message("Revise los campos"),HttpStatus.BAD_REQUEST);
        this.productService.saveProduct(product);
        return new ResponseEntity<>(new Message("Actualizado correctamente"),HttpStatus.OK);
    }

    @GetMapping("/type/{category}")
    public ResponseEntity<Object> getProductByCategory(@PathVariable("category") String category) {
        ArrayList<Product> productsByCategory = this.productService.getProductByCategory(category);
        return new ResponseEntity<>(productsByCategory, HttpStatus.OK);
    }

    @GetMapping("/unidadesTotales/{enterpriseId}")
    public ResponseEntity<Object> findByMonthAndEnterpriseId(@PathVariable("enterpriseId") Long enterpriseId) {
        ArrayList<Long> unidadesTotales = new ArrayList<>();
        for (int month = 1; month <= 12; month++) {
            Long findByMonthAndEnterpriseId = this.productService.findByMonthAndEnterpriseId(month, enterpriseId);
            unidadesTotales.add(findByMonthAndEnterpriseId);
        }
        return new ResponseEntity<>(unidadesTotales, HttpStatus.OK);
    }


    @GetMapping("/fabricante/{idEnterprise}")
    public List<Product> getProductByFabricante(@PathVariable Long idEnterprise){
        return this.productService.getProductByFabricante(idEnterprise);
    }

    @DeleteMapping(path = "/{id}")
    public String deleteOrdenadorById(@PathVariable("id") Long id){
        boolean ok=this.productService.deleteProduct(id);
        if(ok){
            return "Ordenador with id "+id+" deleted!";
        }else{
            return "Error, we have a problem and can´t delete ordenador with id "+id;
        }
    }


    private String uploadImageToS3(String imageName, byte[] imageBytes) {
        String accessKey = clientId;
        String secretKey = secretId;



        AwsBasicCredentials awsCredentials = AwsBasicCredentials.create(accessKey, secretKey);
        StaticCredentialsProvider credentialsProvider = StaticCredentialsProvider.create(awsCredentials);

        S3Client s3Client = S3Client.builder()
                .credentialsProvider(credentialsProvider)
                .region(Region.EU_WEST_3)
                .build();

        try {
            ByteArrayInputStream imageStream = new ByteArrayInputStream(imageBytes);
            software.amazon.awssdk.core.sync.RequestBody requestBody = software.amazon.awssdk.core.sync.RequestBody.fromBytes(imageBytes);
            s3Client.putObject(PutObjectRequest.builder()
                            .bucket(bucketName)
                            .key(imageName)
                            .build(),
                    requestBody);

            return s3Client.utilities().getUrl(GetUrlRequest.builder().bucket(bucketName).key(imageName).build()).toExternalForm();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            s3Client.close();
        }
    }


    // Unidades vendidas por mes
    @GetMapping("/unidadesVendidasTotales/{enterpriseId}")
    public ResponseEntity<List<Map<String, Object>>> getUnidadesVendidasTotales(@PathVariable Long enterpriseId) {
        List<Map<String, Object>> data = productService.getUnidadesVendidasPorMes(enterpriseId);
        return ResponseEntity.ok(data);
    }

    // Total de unidades registradas
    @GetMapping("/totalRegistradas/{enterpriseId}")
    public ResponseEntity<Long> getTotalRegistradas(@PathVariable Long enterpriseId) {
        return ResponseEntity.ok(productService.getTotalRegistradas(enterpriseId));
    }

    // Total de unidades restantes
    @GetMapping("/totalRestantes/{enterpriseId}")
    public ResponseEntity<Long> getTotalRestantes(@PathVariable Long enterpriseId) {
        return ResponseEntity.ok(productService.getTotalRestantes(enterpriseId));
    }

    // Total de dinero conseguido
    @GetMapping("/totalDinero/{enterpriseId}")
    public ResponseEntity<Map<String, Double>> getTotalDinero(@PathVariable Long enterpriseId) {
        Double total = productService.getTotalDinero(enterpriseId);
        Map<String, Double> response = new HashMap<>();
        response.put("total", total != null ? total : 0.0);
        return ResponseEntity.ok(response);
    }

    // Dinero conseguido por mes
    @GetMapping("/dineroPorMes/{enterpriseId}")
    public ResponseEntity<List<Map<String, Object>>> getDineroPorMes(@PathVariable Long enterpriseId) {
        List<Map<String, Object>> data = productService.getDineroPorMes(enterpriseId);
        return ResponseEntity.ok(data);
    }
}
