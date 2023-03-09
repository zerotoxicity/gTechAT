CREATE TABLE IF NOT EXISTS game(
                                   gameId VARCHAR(200) PRIMARY KEY,
                                   board INTEGER[3][3],
                                   move_count INT,
                                   player1 VARCHAR(200),
                                   player2 VARCHAR(200),
                                   player_turn varchar(200),
                                   current_status smallint,
                                   winner varchar(200)
);