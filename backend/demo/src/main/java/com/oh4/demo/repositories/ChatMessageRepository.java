package com.oh4.demo.repositories;

import com.oh4.demo.entities.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findBySalesListingIdOrderBySentAsc(long sales_listing_id);
}
