'use server'
import { ElementsCount, Order, ResultList, SearchParams } from "../utils/definitions";


import { sql } from "@vercel/postgres";
import { capitalize } from "../utils/text-transform";

export async function searchElements(searchParams : SearchParams){


    const searchQuery = validQuery(searchParams);
    const countQuery = countValidQuery(searchParams)

    
    const {rows: elements} = await sql.query(searchQuery)
    const {rows: elementsCount} = await sql.query(countQuery)

    return {elements: elements as unknown as ResultList, elementsCount: elementsCount[0] as unknown as ElementsCount}
}


function validQuery(searchParams: SearchParams)
{
    const {query, page, category, order, orderBy} = searchParams
    let limit = 10
    let offset = (page * 10) - 10

    if(!page || page <= 0){
        limit = 10
        offset = 0
    }

    let currOrder: string = capitalize(orderBy)
    const validColumns = ['Title', 'Type']

    if(!validColumns.includes(currOrder)){
        currOrder = 'Title'
    }
    const categoryPlaceholders = category.length > 0 ? 'AND (' + category.map((el) => `"Type" ILIKE '%${el}%'`).join(' OR ') + ')': ''

    const searchQuery = `
    SELECT * FROM "Elements"
        WHERE "Title" ILIKE '%${query}%'
        ${categoryPlaceholders}
        ORDER BY "${currOrder}" ${order === Order.DESCENDANT ? 'DESC' : ''}
        LIMIT ${limit} OFFSET ${offset}
    `
    return searchQuery
}

function countValidQuery(searchParams: SearchParams)
{
    const {query, category} = searchParams

    const categoryPlaceholders = category.length > 0 ? 'AND (' + category.map((el) => `"Type" ILIKE '${el}'`).join(' OR ') + ')': ''

    const countQuery = `
    WITH category_counts AS (
        SELECT
            "Type",
            COUNT(*) AS count
        FROM "Elements"
        WHERE "Title" ILIKE '%${query}%'
        GROUP BY "Type"
    ),
    total_count AS (
        SELECT COUNT(*) AS count
        FROM "Elements"
        WHERE "Title" ILIKE '%${query}%'
    )
    SELECT t.count::integer,
    (SELECT SUM(count)::integer FROM category_counts WHERE "Type" ILIKE '%%' ${categoryPlaceholders}) AS "currentCount",
    (SELECT count::integer FROM category_counts WHERE "Type" = 'people') AS "peopleCount",
    (SELECT count::integer FROM category_counts WHERE "Type" = 'vehicles') AS "vehiclesCount",
    (SELECT count::integer FROM category_counts WHERE "Type" = 'planets') AS "planetsCount",
    (SELECT count::integer FROM category_counts WHERE "Type" = 'species') AS "speciesCount",
    (SELECT count::integer FROM category_counts WHERE "Type" = 'starships') AS "starshipsCount",
    (SELECT count::integer FROM category_counts WHERE "Type" = 'films') AS "filmsCount"
    FROM total_count t;
` 
    return countQuery
}