-- Kanban-API
BEGIN;

DROP TABLE IF EXISTS "list";
DROP TABLE IF EXISTS "card";
DROP TABLE IF EXISTS "tag";
DROP TABLE IF EXISTS "card_has_tag";

-- -----------------------------------------------------
-- Table "list"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "list" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL DEFAULT '', -- DEFAULT '' évite que notre champ name soit undefined
  "position" INTEGER NOT NULL DEFAULT '0',
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,--on peut utiliser now() aussi
  "updated_at" timestamptz
);

-- -----------------------------------------------------
-- Table "card"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "card" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL DEFAULT '',
  "position" INTEGER NOT NULL DEFAULT '0',
  "color" TEXT NOT NULL DEFAULT '#FFF',
  "content" TEXT NOT NULL DEFAULT '',
  "list_id" INTEGER NOT NULL REFERENCES "list" ("id") ON DELETE CASCADE,
  -- ON DELETE CASCADE permet que la carte soit supprimer automatiquement si sa liste est supprimer
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);


-- -----------------------------------------------------
-- Table "tag"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "tag" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL DEFAULT '',
  "color" TEXT NOT NULL DEFAULT '#FFF',
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

-- -----------------------------------------------------
-- Table "card_has_tag"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "card_has_tag" (
  "card_id" INTEGER NOT NULL REFERENCES "card" ("id") ON DELETE CASCADE,
  "tag_id" INTEGER NOT NULL REFERENCES "tag" ("id") ON DELETE CASCADE,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);

COMMIT;