CREATE TABLE doctors(
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT
);

CREATE TABLE patients(
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    dob DATE
);

CREATE TABLE diseases(
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE dr_patient_rel(
    id SERIAL PRIMARY KEY,
    dr_id INTEGER REFERENCES doctors ON DELETE CASCADE,
    patient_id INTEGER REFERENCES patients ON DELETE CASCADE
);

CREATE TABLE patient_diseases(
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients ON DELETE CASCADE,
    disease_id INTEGER REFERENCES diseases ON DELETE CASCADE
);