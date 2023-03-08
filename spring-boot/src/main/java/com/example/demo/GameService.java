package com.example.demo;

import com.example.demo.entity.Game;
import com.example.demo.entity.Gameplay;
import com.example.demo.enums.Piece;
import com.example.demo.enums.Status;
import com.example.demo.event.CustomSpringEvent;
import com.example.demo.storage.GamesContainer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class GameService {
//    @Autowired
//    private ApplicationEventPublisher applicationEventPublisher;



    private final GameRepo gameRepo;

    @Autowired
    public GameService(GameRepo gameRepo) {
        this.gameRepo = gameRepo;
    }

    public List<Game> getGame(){
        return gameRepo.findAll();
    }

    public Game getGame(String gameId) throws Exception {
//         if (!GamesContainer.getInstance().getGames().containsKey(gameId)) throw new Exception("Invalid game");
//        return GamesContainer.getInstance().getGames().get(gameId);
       return gameRepo.findById(gameId).orElseThrow();
    }

    public Game newGame(String player){
        Game game = new Game(new int[3][3],player);
//        GamesContainer.getInstance().setGames(game);
        gameRepo.save(game);
        return game;
    }

    public Game connectToGame(String player2, String gameId) throws Exception {

        Game game = gameRepo.findById(gameId).orElseThrow();
        if(game.getPlayer2()!=null) throw new Exception("Player 2 exists");
        game.setPlayer2(player2);
        game.setStatus(Status.STARTED);
        Random rn = new Random();
        int startingPlayer = rn.nextInt(1+1);
        String nextPlayer = startingPlayer == 0 ? game.getPlayer1() : player2;
        game.setPlayerTurn(nextPlayer);
        gameRepo.save(game);
        return game;
    }

    public Game gameplay(Gameplay gameplay, String id) throws Exception {
        boolean completed = false;
        Game game = gameRepo.findById(id).orElseThrow();
        if(!game.getPlayerTurn().equals(gameplay.getPlayerId())) throw new Exception("Invalid player turn");
        if(game.getStatus().equals(Status.END)) throw new Exception("Game has ended");
        int[][] board = game.getBoard();
        int x = gameplay.getCoordX(),y = gameplay.getCoordY();
        if(board[x][y]!=-1) throw new Exception("Invalid spot");
        int piece = gameplay.getPlayerId().equals(game.getPlayer1())? 0 : 1;
        board[x][y] = piece;
        if(checkWinner(board,piece)){
            game.setWinner(Piece.values()[piece]);
            completed = true;
        }
        else if(game.getMoveCount()+1==board.length*board[0].length) {
            game.setWinner(Piece.D);
            completed = true;
        }
        else{
            String currPlayer = game.getPlayerTurn();
            String nextPlayer = currPlayer.equals(game.getPlayer1()) ? game.getPlayer2() : game.getPlayer1();
            game.setPlayerTurn(nextPlayer);
        }
        if(completed) game.setPlayerTurn("");
        game.setBoard(board);
        game.setMoveCount(game.getMoveCount()+1);

        GamesContainer.getInstance().setGames(game);
        String message = completed ? "Game ended" : "Turn completed";
        gameRepo.save(game);
        return game;
    }

    private boolean checkWinner(int[][] board, int pieceVal){
        //Check vertical/horizontal wins
        for(int i=0; i<3;i++){
            //Horizontal check
            if(pieceVal==board[i][0] && board[i][0]==board[i][1] && board[i][0]==board[i][2]) return true;
            //Vertical check
            if(pieceVal==board[0][i] && board[0][i]==board[1][i] && board[0][i]==board[i][2]) return true;
        }
        //Diagonal win
        if(pieceVal == board[1][1]){
            if( board[0][0] == board[1][1] && board[0][0]==board[2][2]) return true;
            return board[0][2] == board[1][1] && board[0][0] == board[2][0];
        }


        return false;
    }
}
