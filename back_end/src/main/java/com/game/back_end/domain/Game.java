package com.game.back_end.domain;

import java.util.Scanner;

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

    public void play(char symbol, String position) {
        if (player1 == null && player2 == null)
            throw new BusinessException("Defina os jogadores antes de jogar!");
        board.placeMark(position, symbol);
    }

    // public void startConsole() {
    // Scanner scanner = new Scanner(System.in);

    // System.out.println("Jogo iniciado!");

    // boolean hasWinner = true;
    // int player = 1;

    // while (hasWinner) {
    // System.out.println(board.display());
    // if (player == 1) {
    // System.out.println("Sua vez, " + player1.getName() + "!\n");
    // String input = scanner.nextLine();
    // board.placeMark(input, player1.getSymbol());
    // player = 2;

    // if (WinChecker.hasWinner(board, player1.getSymbol())) {
    // hasWinner = false;
    // System.out.println("Você ganhou, " + player1.getName() + "!");
    // }
    // } else {
    // System.out.println("Sua vez, " + player2.getName() + "!\n");
    // String input = scanner.nextLine();
    // board.placeMark(input, player2.getSymbol());
    // player = 1;

    // if (WinChecker.hasWinner(board, player2.getSymbol())) {
    // hasWinner = false;
    // System.out.println("Você ganhou, " + player2.getName() + "!");
    // }
    // }
    // }

    // scanner.close();
    // }
}
