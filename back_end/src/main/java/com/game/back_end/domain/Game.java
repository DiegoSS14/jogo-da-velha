package com.game.back_end.domain;

import org.springframework.stereotype.Component;

import com.game.back_end.controller.dto.HasWinDTO;
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
    private int turn;
    private Board board;

    public Game(Player p1, Player p2, Board board) {
        player1 = p1;
        player2 = p2;
        turn = 1;
        this.board = board;
    }

    public HasWinDTO play(String position) {
        HasWinDTO hasWin = new HasWinDTO();
        if (player1 == null || player2 == null)
            throw new BusinessException("Defina os jogadores antes de jogar!");
        if (turn == 1) {
            board.placeMark(position, player1.getSymbol());
            hasWin.setWin(WinChecker.check(this.board, player1.getSymbol()));
            hasWin.setWinner(player1.getName());
            alternTurn();
        } else {
            board.placeMark(position, player2.getSymbol());
            hasWin.setWin(WinChecker.check(this.board, player2.getSymbol()));
            hasWin.setWinner(player2.getName());
            alternTurn();
        }
        hasWin.setTie(TieChecker.check(this.board));
        
        return hasWin;
    }

    private void alternTurn() {
        if (turn == 1) {
            turn = 2;
        } else {
            turn = 1;
        }
    }
}
