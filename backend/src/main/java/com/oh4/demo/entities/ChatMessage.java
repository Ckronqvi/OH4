package com.oh4.demo.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "from_user_id")
    private User fromUser;

    @ManyToOne
    @JoinColumn(name = "sales_listing_id")
    @JsonBackReference // Use JsonBackReference to prevent serialization loop
    private SalesListing salesListing;

    private LocalDateTime sent;
    private String messageContent;
}