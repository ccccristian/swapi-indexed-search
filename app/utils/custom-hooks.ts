import { useLazyQuery } from "@apollo/client";
import { GET_ELEMENT, SEARCH } from "../api/graphql/graphql-queries";
import { ElementsCount, SearchInput, SearchResult } from "./definitions";
import { searchElements } from './sql-data.js'
import { useEffect, useState } from "react";
import { getDataType } from "./categories";
import { cookies } from "next/headers";

export function useSearch(){
    // const [handleSearch, {called, loading,data}] = useLazyQuery(SEARCH)
    const [data, setData] = useState<{elements: SearchResult, elementsCount: ElementsCount}>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
        async function getData()
        {
            setLoading(e=> true)
            searchElements('').then(response=>{
                setData(response)
                setLoading(e=> false)

            }).catch(err=>{
                setError(err)
            })

        }
        getData()
    }, [])

    async function Search(query?: string, currentPage?: number, category?: string, order?: string)
    {
        const dataType = getDataType(category ?? '')
        const newData = await searchElements(currentPage ?? 0, query, dataType, order)
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
