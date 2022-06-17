CREATE TABLE seasons(
    id SERIAL PRIMARY KEY,
    start_date DATE,
    end_date DATE
);

CREATE TABLE teams(
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE
);

CREATE TABLE players(
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    age INTEGER,
    team_id INTEGER REFERENCES teams ON DELETE SET NULL
);

CREATE TABLE games(
    id SERIAL PRIMARY KEY,
    here_team INTEGER REFERENCES teams ON DELETE SET NULL,
    away_team INTEGER REFERENCES teams ON DELETE SET NULL,
    season_id INTEGER REFERENCES seasons ON DELETE SET NULL
);

CREATE TABLE refs(
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT
);

CREATE TABLE game_refs(
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games ON DELETE SET NULL,
    ref_id INTEGER REFERENCES refs ON DELETE SET NULL
);

CREATE TABLE goals(
    id SERIAL PRIMARY KEY,
    points INTEGER,
    player_id INTEGER REFERENCES players ON DELETE SET NULL,
    game_id INTEGER REFERENCES games ON DELETE SET NULL,
    team_id INTEGER REFERENCES teams ON DELETE SET NULL
);