-- Connect to the database
\c fastify;

-- Create roles/users
CREATE ROLE limited_user WITH LOGIN PASSWORD 'limited_password';
CREATE ROLE basic_user WITH LOGIN PASSWORD 'basic_password';

-- Create tables
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Grant privileges
GRANT CONNECT ON DATABASE fastify TO limited_user;
GRANT CONNECT ON DATABASE fastify TO basic_user;

GRANT USAGE ON SCHEMA public TO limited_user;
GRANT USAGE ON SCHEMA public TO basic_user;

GRANT SELECT ON ALL TABLES IN SCHEMA public TO limited_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO limited_user;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO basic_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO basic_user;

GRANT USAGE, SELECT, UPDATE ON SEQUENCE users_id_seq TO basic_user;
GRANT USAGE, SELECT, UPDATE ON SEQUENCE posts_id_seq TO basic_user;
