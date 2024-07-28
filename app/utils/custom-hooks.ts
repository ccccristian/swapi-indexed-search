import { useLazyQuery } from "@apollo/client";
import { GET_ELEMENT } from "../api/graphql/graphql-queries";
import { ElementsCount, Order, OrderBy, ResultList, SearchInput, SearchParams } from "./definitions";
import { searchElements } from '../sql/sql-data'
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "./get-cookies";


const initial : SearchParams = {
    query: '',
    page: 1,
    category: [],
    order: Order.ASCENDANT,
    orderBy: OrderBy.TITLE
}
export function useSearch(){
    const [data, setData] = useState<{elements: ResultList, elementsCount: ElementsCount}>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
        if(!data){
            Search(initial)
        }
    }, [])

    async function Search(searchParams : SearchParams)
    {
        setLoading(e=> true)
        return searchElements(searchParams).then(response=>{
            const {elements, elementsCount} = response
            if(elements.length <= 0){
                throw new Error('No content found')
            }
            const newData = {
                elements: elements as unknown as ResultList,
                elementsCount: elementsCount as unknown as ElementsCount,
    
            }
            setData(newData)
            setError(null)
            setLoading(e=> false)
            return newData
        }).catch(err=>{
            const newData = {
                elements: [],
                elementsCount: {}
            }
            setError(err)
            setLoading(e=> false)
            return newData
        })

    }
    const called = false

    return {Search, called, error, loading, data}
}
export function useTheme(theme: string) : [boolean, (value:boolean) => void]
{
    const isNightActive = theme === 'dark'

    function setNightActive(value: boolean)
    {
        setCookie('data-theme', value ? 'dark' : 'light')
    }

    return [isNightActive, setNightActive]
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
