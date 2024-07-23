'use server'
import Database from "better-sqlite3"
import { DataType, Order, OrderBy, SearchParams } from "./definitions"

const db = new Database('app/api/index/database.db')

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
    (SELECT count FROM category_counts WHERE type = 'people') AS peopleCount,
    (SELECT count FROM category_counts WHERE type = 'vehicles') AS vehiclesCount,
    (SELECT count FROM category_counts WHERE type = 'planets') AS planetsCount,
    (SELECT count FROM category_counts WHERE type = 'species') AS speciesCount,
    (SELECT count FROM category_counts WHERE type = 'starships') AS starshipsCount,
    (SELECT count FROM category_counts WHERE type = 'films') AS filmsCount
    FROM total_count t;
`

export async function searchElements(searchParams : SearchParams)
{
    let limit = 10
    let offset = (searchParams.page * 10) - 10

    if(!searchParams.page || searchParams.page <= 0){
        limit = 10
        offset = 0
    }
    const searchTerm = `%${searchParams.query}%`

    const searchQuery = validQuery(searchParams.order, searchParams.orderBy, searchParams.category)
    const countQuery = countValidQuery(searchParams.category)

    const categoryTerms = searchParams.category.map(category => `%${category}%`)
    const elements = await db.prepare(searchQuery).all(searchTerm, ...categoryTerms, limit, offset)
    const elementsCount = await db.prepare(countQuery).get(searchTerm, searchTerm, ...categoryTerms)
    return {elements , elementsCount}
}

function validQuery(order: Order, orderBy: OrderBy, category: DataType[])
{
    let currOrder: string = orderBy
    const validColumns = ['title', 'type']

    if(!validColumns.includes(orderBy)){
        currOrder = 'title'
    }
    const categoryPlaceholders = category.length > 0 ? 'AND (' + category.map(() => 'type LIKE ?').join(' OR ') + ')': ''

    const searchQuery = `
    SELECT * FROM Elements
        WHERE title LIKE ?
        ${categoryPlaceholders}
        ORDER BY ${currOrder} ${order === Order.DESCENDANT ? 'DESC' : ''}
        LIMIT ? OFFSET ?
    `
    return searchQuery
}

function countValidQuery(category: DataType[])
{

    const categoryPlaceholders = category.length > 0 ? 'AND (' + category.map(() => 'type LIKE ?').join(' OR ') + ')': ''

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
    (SELECT SUM(count) FROM category_counts WHERE type LIKE '%%' ${categoryPlaceholders}) AS currentCount,
    (SELECT count FROM category_counts WHERE type = 'people') AS peopleCount,
    (SELECT count FROM category_counts WHERE type = 'vehicles') AS vehiclesCount,
    (SELECT count FROM category_counts WHERE type = 'planets') AS planetsCount,
    (SELECT count FROM category_counts WHERE type = 'species') AS speciesCount,
    (SELECT count FROM category_counts WHERE type = 'starships') AS starshipsCount,
    (SELECT count FROM category_counts WHERE type = 'films') AS filmsCount
    FROM total_count t;
` 
    return countQuery
}