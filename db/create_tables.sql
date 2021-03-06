CREATE TABLE player(
  player_id SERIAL PRIMARY KEY,
  username TEXT,
  hash TEXT
);

CREATE TABLE game(
  game_id SERIAL PRIMARY KEY,
  title TEXT,
  game_type TEXT,
  hours_played INT
);

CREATE TABLE user_in_game(
  user_in_game_id SERIAL PRIMARY KEY,
  game_id INT REFERENCES game(game_id),
  user_id INT REFERENCES player(player_id),
  is_gm VARCHAR(10)
);

CREATE TABLE charsheet(
  charsheet_id SERIAL PRIMARY KEY,
  player INT REFERENCES player(player_id),
  str INT,
  dex INT,
  con INT,
  intel INT,
  wis INT,
  cha INT,
  perception INT,
  inspiration INT,
  prof_bonus INT,
  str_st INT,
  dex_st INT,
  con_st INT,
  int_st INT,
  wis_st INT,
  cha_st INT, 
  acrobatics VARCHAR(10),
  animal_handling VARCHAR(10),
  arcana VARCHAR(10),
  athletics VARCHAR(10),
  deception VARCHAR(10),
  history VARCHAR(10),
  insight VARCHAR(10),
  intimidation VARCHAR(10),
  investigation VARCHAR(10),
  medicine VARCHAR(10),
  nature VARCHAR(10),
  preception VARCHAR(10),
  performance VARCHAR(10),
  persuasion VARCHAR(10),
  religion VARCHAR(10),
  sleight_of_hand VARCHAR(10),
  stealth VARCHAR(10),
  survival VARCHAR(10),
  charclass TEXT,
  charlevel INT,
  race TEXT,
  background TEXT,
  alignment TEXT,
  playername TEXT,
  exp INT,
  ac INT,
  initiative INT,
  speed INT,
  hp_max INT,
  hp INT,
  temp_hp INT,
  hitdice_total INT,
  hitdice INT,
  deathsave_successes INT,
  deathsave_failures INT,
  attacks_spellcasting TEXT, 
  equipment TEXT,
  copper INT,
  silver INT,
  gold INT,
  platinum INT,
  personality TEXT,
  ideals TEXT,
  bonds TEXT,
  flaws TEXT,
  features_traits TEXT,
  languages_proficiencies TEXT
  
);

CREATE TABLE quest(
  quest_id SERIAL PRIMARY KEY,
  questlog_id INT REFERENCES questlog(questlog_id),
  title TEXT,
  description TEXT,
  objectives TEXT
)