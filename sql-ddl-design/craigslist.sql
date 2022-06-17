CREATE TABLE reigons(
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username TEXT,
    reigon_pref INTEGER REFERENCES reigons ON DELETE SET NULL
);

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    reigon_id INTEGER REFERENCES reigons ON DELETE SET NULL,
    category_id INTEGER REFERENCES categories ON DELETE SET NULL
);