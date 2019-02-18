const knex = require('knex');

exports.up = async function(knex, Promise) {
   const qSource = `
   CREATE TYPE encoding_type AS ENUM ('latin1', 'utf8');
   CREATE TYPE environment_type AS ENUM ('development', 'staging', 'production');

   CREATE TABLE source(
    id            uuid PRIMARY KEY NOT NULL,
    name          TEXT NOT NULL,
    environment   environment_type DEFAULT 'development'::environment_type,
    encoding      encoding_type DEFAULT 'utf8'::encoding_type,
    created_at    TIMESTAMPTZ DEFAULT now(),
    updated_at    TIMESTAMPTZ DEFAULT now(),
    deleted_at    TIMESTAMPTZ
   );


   CREATE TYPE status_type AS ENUM ('error', 'enqueued', 'processing', 'finished');
   CREATE TABLE message(
    id            uuid,
    source_id     uuid REFERENCES source(id) ON DELETE CASCADE,
    message       TEXT NOT NULL,
    status        status_type DEFAULT 'enqueued'::status_type,  
    created_at    TIMESTAMPTZ DEFAULT now(),
    updated_at    TIMESTAMPTZ DEFAULT now(),
    deleted_at    TIMESTAMPTZ,

    PRIMARY KEY (id, source_id)
   );
  `
   await knex.raw(qSource); 
};

exports.down = async function(knex, Promise) {
    const qDrop = `
    DROP TABLE IF EXISTS source CASCADE;
    DROP TABLE IF EXISTS message CASCADE;
    DROP TYPE encoding_type;
    DROP TYPE environment_type;
    DROP TYPE status_type;
    `
    await knex.raw(qDrop);
};
