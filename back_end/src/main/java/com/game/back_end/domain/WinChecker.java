package com.game.back_end.domain;

public class WinChecker {

    public static boolean hasWinner(Board board, char symbol) {
        char[][] cells = board.getCells();

        // Linhas
        for (int i = 0; i < 3; i++) {
            if (cells[i][0] == symbol
                    && cells[i][1] == symbol
                    && cells[i][2] == symbol) {
                return true;
            }
        }

        // Colunas
        for (int i = 0; i < 3; i++) {
            if (cells[0][i] == symbol
                    && cells[1][i] == symbol
                    && cells[2][i] == symbol) {
                return true;
            }
        }

        // Diagonal Primária
        if (cells[0][0] == symbol
                && cells[1][1] == symbol
                && cells[2][2] == symbol) {
            return true;
        }

        // Diagonal Secundária
        if (cells[0][2] == symbol
                && cells[1][1] == symbol
                && cells[2][0] == symbol) {
            return true;
        }

        return false;
    }
}
