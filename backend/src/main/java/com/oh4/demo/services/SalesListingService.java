package com.oh4.demo.services;

import com.oh4.demo.DTOMappers.UserDTOMapper;
import com.oh4.demo.RESTObjects.SalesListingResponse;
import com.oh4.demo.entities.SalesListing;
import com.oh4.demo.entities.User;
import com.oh4.demo.repositories.SalesListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class SalesListingService {

  private final ChatMessageService chatMessageService;
  private final JwtService jwtService;
  private final UserService userService;
  private final UserDTOMapper userDTOMapper;
  private final SalesListingRepository salesListingRepository;
  private final ResourceLoader resourceLoader;
  private static String FOLDERNAME = "/var/images/"; // DEFAULT PLACE TO STORE THE IMAGES
  @Autowired
  public SalesListingService(SalesListingRepository salesListingRepository,
                             ChatMessageService chatMessageService,
                            JwtService jwtService, 
                            UserService userService, 
                            UserDTOMapper userDTOMapper, 
                            ResourceLoader resourceLoader,
                            @Value("${image.folder}") String folderName) {
    this.salesListingRepository = salesListingRepository;
    this.chatMessageService = chatMessageService;
    this.jwtService = jwtService;
    this.userService = userService;
    this.userDTOMapper = userDTOMapper;
    this.resourceLoader = resourceLoader;
    if(null != folderName) {
      FOLDERNAME = folderName;
    }
  }

  public List<SalesListing> getListings() {
    return salesListingRepository.findAll();
  }

  public SalesListingResponse getListingById(Long id) {
    SalesListing salesListing = salesListingRepository.findById(id).orElseThrow();
    salesListing.setChatMessages(chatMessageService.getMessagesByListing(id));
    return new SalesListingResponse(
        userDTOMapper.apply(salesListing.getSeller()),
        salesListing
    );
  }

  public boolean addListingImage(MultipartFile file) throws Exception{
    try {
      byte[] bytes = file.getBytes();
      Path path = Paths.get(FOLDERNAME + file.getOriginalFilename());
      Files.write(path, bytes);
    } catch (IOException ioe) {
      System.out.println("ERROR: IOException occurred while getting resource path: " +
          ioe.getMessage());
      return false;
    }
    return true;
  }

  public SalesListing addListing(String authHeader,
                                      SalesListing salesListing) throws Exception{
    //EXTRACT THE TOKEN
    String token = authHeader.substring(7);
    //SET SELLER
    String username = jwtService.extractUsername(token);
    User user = userService.getUserByUsername(username);
    salesListing.setSeller(user);
    //SET TIMESTAMP
    salesListing.setListingDate(LocalDateTime.now());
    return salesListingRepository.save(salesListing);
  }

  public byte[] getListingImg(String imgUrl) throws IOException{
    Path imgPath = Paths.get(FOLDERNAME + imgUrl);
    return Files.readAllBytes(imgPath);
  }
}
