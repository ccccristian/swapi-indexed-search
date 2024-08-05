'use server'
import { ElementsCount, Order, ResultList, SearchParams } from "../../utils/definitions";


import { sql } from "@vercel/postgres";
import { capitalize } from "../../utils/text-transform";
import escapeString from "../../utils/escapeString";

export async function searchElements(searchParams : SearchParams){
    try{
        //Getting valid queries
        const {searchQuery, params} = validQuery(searchParams);
        const {countQuery, params: countParams} = countValidQuery(searchParams)

        //Call to a vercel/postgres database
        const {rows: elements} = await sql.query(searchQuery, params)
        const {rows: elementsCount} = await sql.query(countQuery, countParams)

        return {
            elements: elements as unknown as ResultList, 
            elementsCount: elementsCount[0] as unknown as ElementsCount
        }
    }catch(err){
        //Managing error
        throw new Error('There was a problem retrieving data. Please try again.')
    }

}

//Gets search params and return a valid query and the params for it.
function validQuery(searchParams: SearchParams)
{
    //Destructuring
    const {query, page, category, order, orderBy} = searchParams

    //Params of the sql query
    let params : Array<string | number> = []

    //Cleans query of unwanted symbols
    const cleanQuery = escapeString(query)

    //First param, search query
    params.push(`%${cleanQuery}%`)

    //If order is descendant, it indicates it; if is anything else,
    //order will not be indicated, and sql interprets that is ascendant.
    const fixedOrder = order === Order.DESCENDANT ? 'DESC' : ''

    //This section converts an array of DataType to a sql query condition.
    let categoryPlaceholders = ''
    if(category.length > 0){ 
        categoryPlaceholders = 'AND (' + category.map((el) => 
            {
                params.push(`%${el}%`)
                return(`"Type" ILIKE $${params.length}`)
            }).join(' OR ') + ')'
    }
    


    let currOrder: string = capitalize(orderBy)

    //Avoids invalid 'order by' input in the url params.
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

    //Push to the query params
    params.push(limit)
    params.push(offset)
    return {searchQuery, params}
}

function countValidQuery(searchParams: SearchParams)
{
    //Params of the sql query
    let params : Array<string | number> = []
    //Destructuring
    const {query, category} = searchParams

    //Cleans query of unwanted symbols
    const cleanQuery = escapeString(query)

    //First param, search query
    params.push(`%${cleanQuery}%`)

    //This section converts an array of DataType to a sql query condition.
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

//Converts the current page to limit and offset, ten elements per page.
const limitAndOffset = (page: number)=>{
    let limit = 10
    let offset = (page * 10) - 10
    
    if(!page || page <= 0){
        offset = 0
    }

    return {limit, offset}
}
