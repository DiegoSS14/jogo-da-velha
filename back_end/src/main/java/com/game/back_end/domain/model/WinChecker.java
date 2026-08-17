package com.game.back_end.domain.model;

public class WinChecker {

    public static boolean check(Board board, String symbol) {
        String[][] cells = board.getCells();

        // Linhas
        for (int i = 0; i < 3; i++) {
            if (cells[i][0].equals(symbol)
                    && cells[i][1].equals(symbol)
                    && cells[i][2].equals(symbol)) {
                return true;
            }
        }

        // Colunas
        for (int i = 0; i < 3; i++) {
            if (cells[0][i].equals(symbol)
                    && cells[1][i].equals(symbol)
                    && cells[2][i].equals(symbol)) {
                return true;
            }
        }

        // Diagonal Primária
        if (cells[0][0].equals(symbol)
                && cells[1][1].equals(symbol)
                && cells[2][2].equals(symbol)) {
            return true;
        }

        // Diagonal Secundária
        if (cells[0][2].equals(symbol)
                && cells[1][1].equals(symbol)
                && cells[2][0].equals(symbol)) {
            return true;
        }

        return false;
    }
}
