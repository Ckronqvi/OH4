package com.oh4.demo.controllers;

import com.oh4.demo.RESTObjects.SalesListingResponse;
import com.oh4.demo.entities.SalesListing;
import com.oh4.demo.repositories.SalesListingRepository;
import com.oh4.demo.services.JwtService;
import com.oh4.demo.services.SalesListingService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("api/v1/listing")
public class SalesListingController {
  private final SalesListingService salesListingService;

  @Autowired
  public SalesListingController(SalesListingService salesListingService, ResourceLoader resourceLoader, JwtService jwtService) {
    this.salesListingService = salesListingService;
  }

  @GetMapping("/getListings")
  public ResponseEntity<List<SalesListing>> getListings() {
    return ResponseEntity.ok(salesListingService.getListings());
  }

  @GetMapping("/getListing/{id}")
  public ResponseEntity<SalesListingResponse> getListings(@PathVariable("id") Long id) {
    return ResponseEntity.ok(salesListingService.getListingById(id));
  }


  @RequestMapping(value = "/addListing", method = RequestMethod.POST, consumes = {"application/json"})
  public ResponseEntity<?> uploadFile(HttpServletRequest request,
                                      @RequestBody SalesListing salesListing
  ) throws Exception {
    String authHeader = request.getHeader("Authorization");
    ResponseEntity<?> responseEntity = ResponseEntity.ok(salesListingService.addListing(authHeader, salesListing));
    responseEntity.getBody();
    return responseEntity;
  }

  @RequestMapping(value = "/addListingImage", method = RequestMethod.POST, consumes = {"image/*", "multipart/form-data"})
  public ResponseEntity<?> uploadImage(@RequestPart("file") MultipartFile file) throws Exception {
    ResponseEntity<?> responseEntity = ResponseEntity.ok(salesListingService.addListingImage(file));
    responseEntity.getBody();
    return responseEntity;
  }


  @GetMapping("/getListingImage/{url}")
  public ResponseEntity<?> getListingImg(@PathVariable("url") String imgUrl) {
    byte[] imageBytes;
    try {
      imageBytes = salesListingService.getListingImg(imgUrl);
    } catch (IOException ie) {
      return (ResponseEntity<?>) ResponseEntity.internalServerError();
    }
    String imageType = imgUrl.substring(imgUrl.lastIndexOf('.') + 1);
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.parseMediaType("image/" + imageType));
    return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
  }
}


