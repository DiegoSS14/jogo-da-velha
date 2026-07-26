package com.game.back_end.domain;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import lombok.Getter;

@Getter
@Component
public class Board {
    private char[][] cells;
    private Map<String, List<Integer>> positions;

    public Board() {
        reset();
        positions = new HashMap<>();
        positions.put("1", Arrays.asList(0, 0));
        positions.put("2", Arrays.asList(0, 1));
        positions.put("3", Arrays.asList(0, 2));
        positions.put("4", Arrays.asList(1, 0));
        positions.put("5", Arrays.asList(1, 1));
        positions.put("6", Arrays.asList(1, 2));
        positions.put("7", Arrays.asList(2, 0));
        positions.put("8", Arrays.asList(2, 1));
        positions.put("9", Arrays.asList(2, 2));
    }

    public void reset() {
        cells = new char[3][3];
        for(int linha = 0; linha < 3; linha++) {
            for(int coluna = 0; coluna < 3; coluna++){
                cells[linha][coluna] = '-';
            }
        }
    }

    public boolean isOpen(int x, int y) {
        return true;
    }

    public String display() {
        String table = "";

        for (char[] board : cells) {
            for(int i = 0; i < 3; i++) {
                table += (" " + board[i] + " ");
            }
            table+="\n";
        }

        return table;
    }

    public void placeMark(String position, char symbol) {
        List<Integer> positionMap = positions.get(position);
        this.cells[positionMap.get(0)][positionMap.get(1)] = symbol;
    }

    public char getCell(int x, int y) {
        return this.cells[x][y];
    }
}
