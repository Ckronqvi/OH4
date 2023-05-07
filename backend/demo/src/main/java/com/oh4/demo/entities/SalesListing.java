package com.oh4.demo.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.oh4.demo.enums.Category;
import com.oh4.demo.enums.ProductCondition;
import lombok.Data;


import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


@Data
@Entity
public class SalesListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName;
    private String description;
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    private ProductCondition productCondition;

    @Enumerated(EnumType.ORDINAL)
    private Category productCategory;

    private LocalDateTime listingDate;
    private String city;

    private String imgURL;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    @JsonBackReference
    private User seller;


    @OneToMany(mappedBy = "salesListing")
    @JsonManagedReference
    private List<ChatMessage> chatMessages;
}
