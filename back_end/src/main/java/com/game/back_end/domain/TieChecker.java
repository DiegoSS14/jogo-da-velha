package com.game.back_end.domain;

public class TieChecker {

    public static boolean check(Board board) {
        String[][] boardCheck = board.getCells();

        for (String[] row : boardCheck) {
            for (String cell : row) {
                if (cell == null || cell.isEmpty()) {
                    return false;
                }
            }
        }

        return true;
    }
}
