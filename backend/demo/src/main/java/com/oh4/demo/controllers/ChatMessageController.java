package com.oh4.demo.controllers;

import com.oh4.demo.entities.ChatMessage;
import com.oh4.demo.services.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/message")
public class ChatMessageController {
    private final ChatMessageService chatMessageService;

    @Autowired
    public ChatMessageController(ChatMessageService chatMessageService){
        this.chatMessageService = chatMessageService;
    }

    @GetMapping("/{listingId}")
    public ResponseEntity<List<ChatMessage>> getMessages(@PathVariable("listingId") long listingId) {
        return ResponseEntity.ok(chatMessageService.getMessagesByListing(listingId));
    }

    @PostMapping("/addMessage")
    public ResponseEntity<ChatMessage> addMessage(@RequestBody ChatMessage chatMessage) {
        return ResponseEntity.ok(chatMessageService.addMessage(chatMessage));
    }
}
