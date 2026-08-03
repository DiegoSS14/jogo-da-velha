package com.game.back_end.domain;

import org.springframework.stereotype.Component;

import com.game.back_end.exception.BusinessException;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Component
public class Game {

    private Player player1;
    private Player player2;
    private Board board;

    public Game(Player p1, Player p2, Board board) {
        player1 = p1;
        player2 = p2;
        this.board = board;
    }

    public void play(String symbol, String position) {
        if (player1 == null && player2 == null)
            throw new BusinessException("Defina os jogadores antes de jogar!");
        board.placeMark(position, symbol);
    }
}
