package com.example.demo.handler;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.example.demo.service.NotificationService;

public class NotificationWebSocketHandler extends TextWebSocketHandler {

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // Example of handling incoming messages
        System.out.println("Received message: " + message.getPayload());

        // Example of sending back a response
        session.sendMessage(new TextMessage("Notification received successfully"));
    }

    @Override
public void afterConnectionEstablished(WebSocketSession session) throws Exception {
    NotificationService.addSession(session);
}

@Override
public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
    NotificationService.removeSession(session);
}
}
