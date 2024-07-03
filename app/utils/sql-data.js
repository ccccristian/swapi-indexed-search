'use server'
import Database from "better-sqlite3"

const db = new Database('app/api/index/database.db')

const searchQueryASC = `
    SELECT * FROM Elements
        WHERE title LIKE ?
        AND type LIKE ?
        ORDER BY title
        LIMIT ? OFFSET ?
    `

const searchQueryDESC = `
    SELECT * FROM Elements
        WHERE title LIKE ?
        AND type LIKE ?
        ORDER BY title DESC
        LIMIT ? OFFSET ?
    `

const countQuery = `
    WITH category_counts AS (
        SELECT
            type,
            COUNT(*) AS count
        FROM Elements
        WHERE title LIKE ?
        GROUP BY type
    ),
    total_count AS (
        SELECT COUNT(*) AS count
        FROM Elements
        WHERE title LIKE ?
    )
    SELECT t.count,
    (SELECT SUM(count) FROM category_counts WHERE type LIKE ?) AS currentCount,
    (SELECT count FROM category_counts WHERE type = 'PERSON') AS peopleCount,
    (SELECT count FROM category_counts WHERE type = 'VEHICLE') AS vehiclesCount,
    (SELECT count FROM category_counts WHERE type = 'PLANET') AS planetsCount,
    (SELECT count FROM category_counts WHERE type = 'SPECIES') AS speciesCount,
    (SELECT count FROM category_counts WHERE type = 'STARSHIP') AS starshipsCount,
    (SELECT count FROM category_counts WHERE type = 'FILM') AS filmsCount
    FROM total_count t;
`

export async function searchElements(currentPage, query, category, order)
{
    let limit = 10
    let offset = (currentPage * 10) - 10

    if(!currentPage || currentPage <= 0){
        limit = 10
        offset = 0
    }

    const searchTerm = query ? `%${query}%` : '%%'
    const categoryTerm = category ? `%${category}%` : '%%'
    const elements = await db.prepare(order === 'descendant' ? searchQueryDESC : searchQueryASC).all(searchTerm, categoryTerm, limit, offset)
    const elementsCount = await db.prepare(countQuery).get(searchTerm, searchTerm, categoryTerm)
    
    return {elements, elementsCount}
}