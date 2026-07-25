package com.diego.game.domain;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

public class Game {

    private Player player1;
    private Player player2;
    private Board board;

    public Game(String name1, String name2) {
        player1 = new Player('X', name1);
        player2 = new Player('O', name2);
        board = new Board();
    }

    public void start() {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Jogo iniciado!");

        boolean hasWinner = true;
        int player = 1;

        while (hasWinner) {
            System.out.println(board.display());
            if (player == 1) {
                System.out.println("Sua vez, " + player1.getName() + "!\n");
                String input = scanner.nextLine();
                board.placeMark(input, player1.getSymbol());
                player = 2;

                if (WinChecker.hasWinner(board, player1.getSymbol())) {
                    hasWinner = false;
                    System.out.println("Você ganhou, " + player1.getName() + "!");
                }
            } else {
                System.out.println("Sua vez, " + player2.getName() + "!\n");
                String input = scanner.nextLine();
                board.placeMark(input, player2.getSymbol());
                player = 1;

                if (WinChecker.hasWinner(board, player2.getSymbol())) {
                    hasWinner = false;
                    System.out.println("Você ganhou, " + player2.getName() + "!");
                }
            }
        }

        scanner.close();
    }
}
