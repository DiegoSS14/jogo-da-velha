package com.game.back_end.exception.models;

public class BusinessException extends RuntimeException {
    public BusinessException(String message) {
        super(message);
    }
}
