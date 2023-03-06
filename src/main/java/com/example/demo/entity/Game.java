package com.example.demo.entity;

import com.example.demo.enums.Piece;
import com.example.demo.enums.Status;

import java.util.Arrays;

public class Game {
    private String gameId;
    private int[][] board;
    private int moveCount;
    private Player player1;
    private Player player2;
    private Status status;
    private Piece winner;


    public Game(String gameId, int[][] board, Player player1){
        this.gameId=gameId;
        for(int i=0; i<board.length;i++) Arrays.fill(board[i],-1);
        this.board= board;
        this.player1=player1;
        this.status=Status.NEW;
        this.moveCount = 0;
    }

    public int getMoveCount() {
        return moveCount;
    }

    public void setMoveCount(int moveCount) {
        this.moveCount = moveCount;
    }

    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public int[][] getBoard() {
        return board;
    }

    public void setBoard(int[][] board) {
        this.board = board;
    }

    public Player getPlayer1() {
        return player1;
    }

    public void setPlayer1(Player player1) {
        this.player1 = player1;
    }

    public Player getPlayer2() {
        return player2;
    }

    public void setPlayer2(Player player2) {
        this.player2 = player2;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Piece getWinner() {
        return winner;
    }

    public void setWinner(Piece winner) {
        this.winner = winner;
        this.status = Status.END;
    }
}
