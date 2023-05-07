package com.oh4.demo.RESTObjects;

import com.oh4.demo.DTOs.UserDTO;
import com.oh4.demo.entities.SalesListing;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SalesListingResponse {
  private UserDTO user;
  private SalesListing salesListing;
}

