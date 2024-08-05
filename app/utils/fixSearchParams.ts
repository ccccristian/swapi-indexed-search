import { ParseCategory } from "./categories";
import { DataType, InitialSearchParams, Order, OrderBy, SearchParams } from "./definitions";

// Converts InitialSearchParams to SearchParams to make using url params easy and consistent
export default function fixSearchParams(searchParams: InitialSearchParams ) : SearchParams
{
    let query = searchParams?.query ?? ''
    let page = fixPage(parseInt(searchParams?.page  ?? '1'))
    let category = getCategory(searchParams?.category)
    let order = getOrder(searchParams?.order)
    let orderBy = getOrderBy(searchParams?.orderBy)

    return {query, page, category, order, orderBy}
}

//Avoids page numbers like '0' or '-5'
function fixPage(currentPage: number){
    if(currentPage <= 0) return 1
    return currentPage
}

//Avoids invalid order param
function getOrder(order: string | undefined){
    switch(order){
        case 'ascendant':
            return Order.ASCENDANT
        case 'descendant':
            return Order.DESCENDANT
        default:
            return Order.ASCENDANT
    }

}
//Avoids invalid orderBy param

function getOrderBy(orderBy: string | undefined)
{
    switch(orderBy){
        case 'title':
            return OrderBy.TITLE
        case 'type':
            return OrderBy.TYPE
        default:
            return OrderBy.TITLE
    }
}
//Converts category param (string) to a valid array of DataTypes based on it
function getCategory(category: string | undefined) : DataType[]{
    if(!category) return []

    const categoryArray = ParseCategory(category ?? '')
    return categoryArray
}

//Used to avoid two queries with the same params.
export function searchParamsAreEqual(sp1: SearchParams, sp2: SearchParams)
{
    return sp1.query === sp2.query &&
           sp1.page === sp2.page &&
           JSON.stringify(sp1.category) === JSON.stringify(sp2.category) &&
           sp1.order === sp2.order &&
           sp1.orderBy === sp2.orderBy;
}
