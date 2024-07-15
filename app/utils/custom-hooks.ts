import { useLazyQuery } from "@apollo/client";
import { GET_ELEMENT } from "../api/graphql/graphql-queries";
import { ElementsCount, Order, OrderBy, ResultList, SearchInput, SearchParams, SearchResult } from "./definitions";
import { searchElements } from './sql-data'
import { useEffect, useState } from "react";


const initial : SearchParams = {
    query: '',
    page: 1,
    category: [],
    order: Order.ASCENDANT,
    orderBy: OrderBy.TITLE
}
export function useSearch(){
    // const [handleSearch, {called, loading,data}] = useLazyQuery(SEARCH)
    const [data, setData] = useState<{elements: ResultList, elementsCount: ElementsCount}>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    
    useEffect(()=>{
        async function getData()
        {
            setLoading(e=> true)
            searchElements(initial).then(response=>{
                const newData = {
                    elements: response.elements as unknown as ResultList,
                    elementsCount: response.elementsCount as unknown as ElementsCount,

                }
                setData(newData)
                setLoading(e=> false)

            }).catch(err=>{
                setError(err)
            })

        }
        getData()
    }, [])

    async function Search(searchParams : SearchParams)
    {
        const response = await searchElements(searchParams)
        const newData = {
            elements: response.elements as unknown as ResultList,
            elementsCount: response.elementsCount as unknown as ElementsCount,

        }
        setData(newData)
        return newData
    }
    const called = false

    return {Search, called, loading, data}
}
export function useGetElement()
{
    const [handleGetElement, {error, loading, data}] = useLazyQuery(GET_ELEMENT)
    function getElement(item: SearchInput){
        const data = handleGetElement({variables: {
            item
        }})
        return data
    }

    return {getElement, error, loading, data}
}
