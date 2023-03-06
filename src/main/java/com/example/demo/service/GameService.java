package com.example.demo.service;

import com.example.demo.entity.Game;
import com.example.demo.entity.Gameplay;
import com.example.demo.entity.Player;
import com.example.demo.enums.Piece;
import com.example.demo.enums.Status;
import com.example.demo.storage.GamesContainer;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class GameService {

    public Game newGame(Player player){
        Game game = new Game(UUID.randomUUID().toString(),new int[3][3],player);
        GamesContainer.getInstance().setGames(game);
        return game;
    }

    public Game connectToGame(Player player2, String gameId) throws Exception {
        GamesContainer gamesContainer = GamesContainer.getInstance();
        if(!gamesContainer.getGames().containsKey(gameId)){
            throw new Exception("Invalid game");
        }
        Game game = gamesContainer.getGames().get(gameId);
        if(game.getPlayer2()!=null) throw new Exception("Player 2 exists");
        game.setPlayer2(player2);
        game.setStatus(Status.STARTED);
        gamesContainer.setGames(game);
        return game;
    }

    public Game gameplay(Gameplay gameplay) throws Exception {
        Game game = GamesContainer.getInstance().getGames().get(gameplay.getGameId());
        if(game.getStatus().equals(Status.END)) throw new Exception("Game has ended");
        int[][] board = game.getBoard();
        int x = gameplay.getCoordX(),y = gameplay.getCoordY();
        board[x][y] = gameplay.getPiece().ordinal();
        boolean[][] visited = new boolean[board.length][board[0].length];
        if(checkWinner(visited,board,x,y,1,gameplay.getPiece().ordinal())){
            game.setWinner(gameplay.getPiece());
        }
        if(game.getMoveCount()==board.length*board[0].length) game.setWinner(Piece.D);
        game.setBoard(board);
        game.setMoveCount(game.getMoveCount()+1);

        GamesContainer.getInstance().setGames(game);
        return game;
    }

    private boolean checkWinner(boolean[][] visited,int[][] board,int x, int y,int count,int pieceVal){
        if(x<0 || x>=board.length || y<0 || y>=board[0].length || visited[x][y] || board[x][y]!=pieceVal) return false;
        count+=1;
        if(count==3) return true;
        visited[x][y] = true;

        for(int i=-1;i<=1;i++){
            for(int j=-1;j<=1;j++){
                if(checkWinner(visited,board,x+i,y+j,count,pieceVal)) return true;
            }
        }
        visited[x][y]=false;

        return false;
    }
}
