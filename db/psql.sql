
-- DROP TYPE IF EXISTS PIECE;
-- DROP TYPE IF EXISTS STAT;
-- -- CREATE CAST (smallint AS PIECE) WITH INOUT AS IMPLICIT;
-- CREATE CAST (smallint AS STAT) WITH INOUT AS IMPLICIT;

-- CREATE TYPE PIECE AS ENUM ('X','O');
-- CREATE TYPE STAT AS ENUM ('NEW','STARTED','END');

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