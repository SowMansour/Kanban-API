À cette étape, les entités du MCD deviennent des tables et leurs propriétés des colonnes

list (
    id (INT, UNIQUE, PRIMARY KEY)
    name (TEXT)
    position (INTEGER)
    created_at (TIMESTAMP)
    updated_at (TIMESTAMP)
)

card (
    id (INT, UNIQUE, PRIMARY KEY)
    title (TEXT)
    position (INTEGER)
    content (TEXT)
    color (TEXT)
    list_id (INT, #list.id)
    created_at (TIMESTAMP)
    updated_at (TIMESTAMP)
)

**Renommer**
tag (
    id (INT, UNIQUE, PRIMARY KEY)
    name (TEXT)
    color (TEXT)
    created_at (TIMESTAMP)
    updated_at (TIMESTAMP)
)


card_has_tag(
    card_id (INT, #card.id)
    tag_id (INT, #tag.id)
    created_at (TIMESTAMP)
)