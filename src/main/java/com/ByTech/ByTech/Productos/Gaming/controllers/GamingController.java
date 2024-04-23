package com.ByTech.ByTech.Productos.Gaming.controllers;


import com.ByTech.ByTech.Productos.Gaming.models.GamingModel;
import com.ByTech.ByTech.Productos.Gaming.services.GamingService;
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
@RequestMapping("/gaming")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001"})
public class GamingController {

    @Autowired
    private GamingService gamingService;
    private final String BUCKET_NAME= "s3-bytech";

    @GetMapping
    public ArrayList<GamingModel> getGaming(){
        return this.gamingService.getGaming();
    }

    @PostMapping(path = "/insertGaming")
    public GamingModel saveGaming(@RequestParam("nombre") String nombre,
                                  @RequestParam("descripcion") String descripcion,
                                  @RequestParam("precio") Double precio,
                                  @RequestParam("unidades") int unidades,
                                  @RequestParam("fabricante") Long fabricante,
                                  @RequestParam("image") MultipartFile image) {
        try {
            if (nombre == null || descripcion == null || precio == null || fabricante == null || image == null || image.isEmpty()) {
                throw new RuntimeException("Por favor, completa todos los campos.");
            }

            GamingModel gamingModel = new GamingModel();
            gamingModel.setNombre(nombre);
            gamingModel.setDescripcion(descripcion);
            gamingModel.setPrecio(precio);
            gamingModel.setUnidades(unidades);
            gamingModel.setFabricante(fabricante);

            byte[] imageBytes = image.getBytes();
            String imageName = image.getOriginalFilename();
            String imageUrl = uploadImageToS3(imageName, imageBytes);
            gamingModel.setImage(imageUrl);

            return gamingService.saveGaming(gamingModel);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Error al guardar la imagen.");
        }
    }

    @GetMapping(path = "/{id}")
    public Optional<GamingModel> getGamingById(@PathVariable("id") Long id){
        return this.gamingService.getByID(id);
    }

    @PutMapping(path = "/{id}")
    public GamingModel updateGamingById(@RequestBody GamingModel request, @PathVariable("id") Long id){
        return this.gamingService.updateByID(request,id);
    }

    @DeleteMapping(path = "/{id}")
    public String deleteGamingById(@PathVariable("id") Long id){
        boolean ok= this.gamingService.deleteGaming(id);
        if(ok){
            return "Gaming with id "+id+" deleted!";
        }else{
            return "Error, we have a problem and can´t delete gaming with id "+ id;
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
    public List<GamingModel> getOrdenadoresByFabricante(@PathVariable Long idEnterprise){
        return this.gamingService.getGamingByFabricante(idEnterprise);
    }
}
