package com.ByTech.ByTech.Productos.Smartphones.controllers;

import com.ByTech.ByTech.Productos.Ordenadores.models.OrdenadorModel;
import com.ByTech.ByTech.Productos.Smartphones.models.SmartphoneModel;
import com.ByTech.ByTech.Productos.Smartphones.services.SmartphoneService;
import org.springframework.beans.factory.annotation.Autowired;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/smartphone")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001"})
public class SmartphoneController {
    @Autowired
    private SmartphoneService smartphoneService;

    private final String BUCKET_NAME= "s3-bytech";

    @GetMapping
    public ArrayList<SmartphoneModel> getSmarphone(){
        return this.smartphoneService.getSmartphones();
    }

    @PostMapping(path = "/insertSmartphone")
    public SmartphoneModel saveSmartphone(@RequestParam("nombre") String nombre,
                                          @RequestParam("descripcion") String descripcion,
                                          @RequestParam("precio") Double precio,
                                          @RequestParam("unidades") int unidades,
                                          @RequestParam("fabricante") Long fabricante,
                                          @RequestParam("image") MultipartFile image){
        try {
            if (nombre == null || descripcion == null || precio == null || fabricante == null || image == null || image.isEmpty()) {
                throw new RuntimeException("Por favor, completa todos los campos.");
            }

            SmartphoneModel smartphone = new SmartphoneModel();
            smartphone.setNombre(nombre);
            smartphone.setDescripcion(descripcion);
            smartphone.setPrecio(precio);
            smartphone.setUnidades(unidades);
            smartphone.setFabricante(fabricante);

            byte[] imageBytes = image.getBytes();
            String imageName = image.getOriginalFilename();
            String imageUrl = uploadImageToS3(imageName, imageBytes);
            smartphone.setImage(imageUrl);

            return this.smartphoneService.saveSmartphone(smartphone);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Error al guardar la imagen.");
        }

    }

    @GetMapping(path = "/{id}")
    public Optional<SmartphoneModel> getSmartphoneById(@PathVariable("id") Long id){
        return this.smartphoneService.getByID(id);
    }

    @PutMapping(path = "/{id}")
    public SmartphoneModel updateSmartphoneById(@RequestBody SmartphoneModel request, @PathVariable("id") Long id){
        return this.smartphoneService.updateByID(request,id);
    }

    @DeleteMapping(path = "/{id}")
    public String deleteSmartphone(@PathVariable("id") Long id){
        boolean ok= this.smartphoneService.deleteSmartphone(id);
        if(ok){
            return "Smartphone with id "+id+" deleted!";
        }else{
            return "Error, we have a problem and can´t delete smartphone with id "+id;
        }
    }

    private String uploadImageToS3(String imageName, byte[] imageBytes) {
        String accessKey = "AKIA6ODUZLCDVXD3I6H7";
        String secretKey = "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";

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
                            .bucket(BUCKET_NAME)
                            .key(imageName)
                            .build(),
                    requestBody);

            return s3Client.utilities().getUrl(GetUrlRequest.builder().bucket(BUCKET_NAME).key(imageName).build()).toExternalForm();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            s3Client.close();
        }
    }

    @GetMapping("/fabricante/{idEnterprise}")
    public List<SmartphoneModel> getSmartphoneByFabricante(@PathVariable Long idEnterprise){
        return this.smartphoneService.getSmartphonesByFabricante(idEnterprise);
    }
}