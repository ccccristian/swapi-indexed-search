'use server'
import { ElementsCount, Order, ResultList, SearchParams } from "../../utils/definitions";


import { sql } from "@vercel/postgres";
import { capitalize } from "../../utils/text-transform";
import escapeString from "../../utils/escapeString";

export async function searchElements(searchParams : SearchParams){
    try{
        const {searchQuery, params} = validQuery(searchParams);
        const {countQuery, params: countParams} = countValidQuery(searchParams)
        const {rows: elements} = await sql.query(searchQuery, params)
        const {rows: elementsCount} = await sql.query(countQuery, countParams)
        return {
            elements: elements as unknown as ResultList, 
            elementsCount: elementsCount[0] as unknown as ElementsCount
        }
    }catch(err){
        throw new Error('There was a problem retrieving data. Please try again.')
    }

}


function validQuery(searchParams: SearchParams)
{
    const {query, page, category, order, orderBy} = searchParams
    let params : Array<string | number> = []
    const cleanQuery = escapeString(query)
    //First param, search query
    params.push(`%${cleanQuery}%`)

    const fixedOrder = order === Order.DESCENDANT ? 'DESC' : ''
    let categoryPlaceholders = ''

    if(category.length > 0){ 
        categoryPlaceholders = 'AND (' + category.map((el) => 
            {
                params.push(`%${el}%`)
                return(`"Type" ILIKE $${params.length}`)
            }).join(' OR ') + ')'
    }
    


    let currOrder: string = capitalize(orderBy)

    if(!['Title', 'Type'].includes(currOrder)){
        currOrder = 'Title'
    }

    const searchQuery = `
    SELECT * FROM "Elements"
        WHERE "Title" ILIKE $1
        ${categoryPlaceholders}
        ORDER BY "${currOrder}" ${fixedOrder}
        LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `

    const {limit, offset } = limitAndOffset(page)
    params.push(limit)
    params.push(offset)
    return {searchQuery, params}
}

function countValidQuery(searchParams: SearchParams)
{
    let params : Array<string | number> = []

    const {query, category} = searchParams

    const cleanQuery = escapeString(query)
    params.push(`%${cleanQuery}%`)

    let categoryPlaceholders = ''

    if(category.length > 0){ 
        categoryPlaceholders = 'AND (' + category.map((el) => 
            {
                params.push(`%${escapeString(el)}%`)
                return(`"Type" ILIKE $${params.length}`)
            }).join(' OR ') + ')'
    }


    const countQuery = `
    WITH category_counts AS (
        SELECT
            "Type",
            COUNT(*) AS count
        FROM "Elements"
        WHERE "Title" ILIKE $1
        GROUP BY "Type"
    ),
    total_count AS (
        SELECT COUNT(*) AS count
        FROM "Elements"
        WHERE "Title" ILIKE $1
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
    return {countQuery, params}
}

const limitAndOffset = (page: number)=>{
    let limit = 10
    let offset = (page * 10) - 10
    
    if(!page || page <= 0){
        offset = 0
    }

    return {limit, offset}
}
