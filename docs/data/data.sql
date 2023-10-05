--
-- Base de données :  "Kanban-API"
--

BEGIN;

INSERT INTO "list" ("name")
VALUES ('Première liste' );

INSERT INTO "card" ("content", "color", "list_id", "position")
VALUES ('Carte 1', '#fff696', 1, 0),
       ('2ème carte', '#c1e7ff', 1, 1);

INSERT INTO "tag" ("name", "color")
VALUES ('Urgent', '#F00');

-- et on oublie pas la table de liaison !
INSERT INTO "card_has_tag" ("card_id", "tag_id")
VALUES (1,1);

COMMIT;


