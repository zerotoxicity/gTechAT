package com.example.demo.storage;

import com.example.demo.entity.Game;

import java.util.HashMap;
import java.util.Map;

public class GamesContainer {
    private static Map<String, Game> games;
    private static GamesContainer instance;

    private GamesContainer(){
        games= new HashMap<>();
    }

    public static synchronized GamesContainer getInstance(){
        if(instance==null) instance = new GamesContainer();
        return instance;
    }

    public Map<String,Game> getGames(){
        return games;
    }

    public void setGames(Game game){
        games.put(game.getGameId(),game);
    }
}
