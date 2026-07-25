package com.diego.game;

import com.diego.game.domain.Game;

public class Main {
    public static void main(String[] args) {
        Game game = new Game("Diego", "Kellen");
        game.start();
    }
}