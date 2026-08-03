package com.game.back_end.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.game.back_end.exception.BusinessException;

@RestControllerAdvice
public class GameExceptionHandler {
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<String> handleBusiness(BusinessException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
