package com.oh4.demo.services;

import com.oh4.demo.entities.ChatMessage;
import com.oh4.demo.repositories.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;

    @Autowired
    public ChatMessageService(ChatMessageRepository chatMessageRepository) {
        this.chatMessageRepository = chatMessageRepository;
    }

    public List<ChatMessage> getMessages(){
        return chatMessageRepository.findAll();
    }

    public List<ChatMessage> getMessagesByListing(Long sales_listing_id){
        return chatMessageRepository.findBySalesListingIdOrderBySentAsc(sales_listing_id);
    }

    public ChatMessage addMessage(ChatMessage chatMessage){
        return chatMessageRepository.save(chatMessage);
    }
}
