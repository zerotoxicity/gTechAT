package com.example.demo;

import com.example.demo.entity.Game;
import com.example.demo.entity.Gameplay;
import com.example.demo.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class GameController {

    private final GameService gameService;

    @Autowired
    public GameController(GameService gameService){
        this.gameService = gameService;
    }

    @GetMapping("/games")
    public Map<Integer,Game> getGames(){
        return gameService.getGame();
    }

    @GetMapping("/games/{id}")
    public Game getGames(@PathVariable String id) throws Exception {
        return gameService.getGame(id);
    }

    @PostMapping("/games/{id}")
    public ResponseEntity<Game> postGame(@PathVariable String id){
        return ResponseEntity.ok(gameService.newGame(id));
    }

    @PutMapping("/games/{id}")
    public ResponseEntity<Game> putGame(@PathVariable String id, @RequestBody Gameplay gameplay) throws Exception {
        return ResponseEntity.ok(gameService.gameplay(gameplay,Integer.parseInt(id)-1));
    }

    @PutMapping("/games/{id}/{playerTwoId}")
    public ResponseEntity<Game> putGamePlayerTwo(@PathVariable String id, @PathVariable String playerTwoId) throws Exception {
        return ResponseEntity.ok(gameService.connectToGame(playerTwoId, Integer.parseInt(id)-1));
    }
}
