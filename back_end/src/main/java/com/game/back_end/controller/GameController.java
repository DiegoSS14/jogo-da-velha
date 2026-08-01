package com.game.back_end.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.game.back_end.domain.Board;
import com.game.back_end.domain.Game;






@RestController
@RequestMapping("/")
public class GameController {
    private final Game game;
    
    public GameController(Game game, Board board) {
        this.game = game;
        game.setBoard(new Board());
    }
    
    @GetMapping("board")
    public ResponseEntity<List<String>> board() {
        return ResponseEntity.ok(game.getBoard().display());      
    }
}
