package com.game.back_end.domain;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.game.back_end.exception.BusinessException;

import lombok.Getter;

@Getter
@Component
public class Board {
    private String[][] cells;
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
        cells = new String[3][3];
        for (int linha = 0; linha < 3; linha++) {
            for (int coluna = 0; coluna < 3; coluna++) {
                cells[linha][coluna] = "";
            }
        }
    }

    public boolean isOpen(int x, int y) {
        return true;
    }

    public List<String> display() {
        List<String> table = new ArrayList<>();

        for (String[] board : cells) {
            for (int i = 0; i < 3; i++) {
                table.addLast(String.valueOf(board[i]));
            }
        }
        return table;
    }

    public void placeMark(String position, String symbol) {
        if (isMark(position)) {
            throw new BusinessException("Posição já ocupada");
        }
        List<Integer> positionMap = positions.get(position);
        this.cells[positionMap.get(0)][positionMap.get(1)] = symbol;
    }

    private boolean isMark(String position) {
        List<Integer> positionMap = positions.get(position);
        String symbol = this.cells[positionMap.get(0)][positionMap.get(1)];
        return symbol == "X" || symbol == "O";
    }

    public String getCell(int x, int y) {
        return this.cells[x][y];
    }
}
