package com.example.demo.exception;

public class ErrorResponse {
    private String message;
    private boolean error;

    public ErrorResponse(String message, boolean error) {
        this.message = message;
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public boolean isError() {
        return error;
    }
}
