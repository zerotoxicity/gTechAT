package com.example.demo;

import com.example.demo.entity.Game;
import com.example.demo.entity.Gameplay;
import com.example.demo.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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
    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    public GameController(GameService gameService){
        this.gameService = gameService;
    }

    @GetMapping("/games")
    public List<Game> getGames(){
        return gameService.getGame();
    }

    @GetMapping("/games/{id}")
    public Game getGame(@PathVariable String id) throws Exception {
        return gameService.getGame(id);
    }

    @PostMapping("/games/{id}")
    public ResponseEntity<Game> postGame(@PathVariable String id){
        return ResponseEntity.ok(gameService.newGame(id));
    }

    @PutMapping("/games/{id}")
    public ResponseEntity<Game> putGame(@PathVariable String id, @RequestBody Gameplay gameplay) throws Exception {
        template.convertAndSend("/topic/lobby",id+"@Update");
        return ResponseEntity.ok(gameService.gameplay(gameplay,id));
    }

    @PutMapping("/games/{id}/{playerTwoId}")
    public Game putGamePlayerTwo(@PathVariable String id, @PathVariable String playerTwoId) throws Exception {
        Game game = gameService.connectToGame(playerTwoId, id);
        template.convertAndSend("/topic/lobby",id+"@New player");
        return game;
    }
}
