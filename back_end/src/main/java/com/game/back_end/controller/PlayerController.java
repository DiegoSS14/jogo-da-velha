package com.game.back_end.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.game.back_end.controller.dto.PlayersDTO;
import com.game.back_end.domain.Game;
import com.game.back_end.domain.Player;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("players")
@RequiredArgsConstructor
public class PlayerController {
    private final Game game;

    @PostMapping("/define")
    public ResponseEntity<String> defineNamePlayers(@RequestBody PlayersDTO playersDTO) {
        Player p1 = new Player('X', playersDTO.nameP1());
        Player p2 = new Player('O', playersDTO.nameP2());
        game.setPlayer1(p1);
        game.setPlayer2(p2);

        return ResponseEntity.ok("Jogadores definidos com sucesso!");
    }

    @GetMapping("show")
    public ResponseEntity<String> showPlayers() {
        if (game.getPlayer1() != null && game.getPlayer2() != null) {
            return ResponseEntity.ok(
                "Player 1: " + game.getPlayer1().getName() + " - Symbol" + game.getPlayer1().getSymbol() 
                + " / Player 2: " + game.getPlayer2().getName() + " - Symbol: " + game.getPlayer2().getSymbol()
            );
        }
        return ResponseEntity.ok("Jogadores não definidos ainda...");
    }
}
