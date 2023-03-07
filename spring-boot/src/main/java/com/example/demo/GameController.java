package com.example.demo;

import com.example.demo.entity.Game;
import com.example.demo.entity.Gameplay;
import com.example.demo.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class GameController {

    private final GameService gameService;
    private final List<SseEmitter> emitters = new ArrayList<>();

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
        return gameService.getGame(Integer.parseInt(id)-1);
    }

    @PostMapping("/games/{id}")
    public ResponseEntity<Game> postGame(@PathVariable String id){
        return ResponseEntity.ok(gameService.newGame(id));
    }

    @PutMapping("/games/{id}")
    public ResponseEntity<Game> putGame(@PathVariable String id, @RequestBody Gameplay gameplay) throws Exception {
        return ResponseEntity.ok(gameService.gameplay(gameplay,Integer.parseInt(id)-1));
    }

    @SendTo("/ws/lobby")
    @PutMapping("/games/{id}/{playerTwoId}")
    public Game putGamePlayerTwo(@PathVariable String id, @PathVariable String playerTwoId) throws Exception {
        Game game =(gameService.connectToGame(playerTwoId, Integer.parseInt(id)-1));
        SseEmitter emitter = new SseEmitter();
        emitter.send("New player");
        emitters.add(emitter);
        emitter.onCompletion(() -> emitters.remove(emitter));
        return game;
    }
}
