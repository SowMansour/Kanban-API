--
-- Base de données :  "Kanban-API"
--

BEGIN;

-- INSERT INTO "list"("name") VALUES
-- ('To Do'),
-- ('In Progress'),
-- ('Testing'),
-- ('Done');

-- Sachant que les clés primaires sont auto-incerementés, j'ai d'abord éxécuté la table parent "list"
-- ET récupérer les ID's et par la suite éxécuter le reste du script en définissant les bons ID's
-- SELECT "id" FROM "list" WHERE "name" IN ('To Do', 'In Progress', 'Testing', 'Done');

-- INSERT INTO "card"("title", "color", "content", "list_id") VALUES
-- ('Market','#FF0000', 'buy fruits', 32),
-- ('Workout', '#FFA500', 'Do proper push-up', 33),
-- ('Eat', '#008000', 'Poutine', 35),
-- ('Mastering JS', '#FFFF00', 'By being consistent in practicising', 34);

-- Same stratégie pour récupérer les id afin de les utiliser sur la table de liaison
-- SELECT "id" FROM "card" WHERE "title" IN ('Market', 'Workout', 'Eat', 'Mastering JS');

-- INSERT INTO "tag"("name", "color") VALUES
-- ('urgent', '#FF0000'),
-- ('not urgent', '#808080'),
-- ('important', '#FFA500'),
-- ('not important', '#FFFF00');

-- Same stratégie pour récupérer les id afin de les utiliser sur la table de liaison
-- SELECT "id" FROM "tag" WHERE "name" IN ('urgent', 'not urgent', 'important', 'not important');

-- Derniere table a etre exécuter car; j'ai commenté les autres car elles sont déja été éxécutés(Cela evite la répétition et doublons) 
INSERT INTO "card_has_tag"("card_id", "tag_id") VALUES
(39, 10),
(40, 11),
(41, 12),
(42, 9);

COMMIT;


