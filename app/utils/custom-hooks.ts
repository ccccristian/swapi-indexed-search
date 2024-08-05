import { useLazyQuery } from "@apollo/client";
import { GET_ELEMENT } from "../api/graphql/graphql-queries";
import { ElementsCount, ResultList, SearchInput, SearchParams } from "./definitions";
import { searchElements } from '../api/sql/sql-data'
import { useCallback, useEffect, useState } from "react";
import { searchParamsAreEqual } from "./fixSearchParams";

const defaultData = {elements: [], elementsCount: {}}

export function useSearch(currentSearchParams: SearchParams){

    //Stores the result list and the count of all elements.
    const [data, setData] = useState<{elements: ResultList, elementsCount: ElementsCount}>(defaultData)

    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState(null)

    // using useCallback because this function is going to be passed through multiple components
    const Search = useCallback((searchParams : SearchParams, force?: boolean)=>
    {
        //If current and the new search params are equal, it will do nothing, except if force mode is activated
        //Force mode is used when is needed to call search and current and new search params are always equals
        //like in the first call by the useEffect below, or the reset function.
        if(searchParamsAreEqual(currentSearchParams, searchParams) && !force) return null

        //loading is set to true
        setLoading(true)
        searchElements(searchParams).then(response=>{
            //elements is the search result list
            //elementsCount is the count of all elements category by category
            const {elements, elementsCount} = response

            //If the search has no results, throw 'no content found'.
            if(elements.length <= 0){
                throw new Error('No content found')
            }

            //Transforming data types
            const newData = {
                elements: elements as unknown as ResultList,
                elementsCount: elementsCount as unknown as ElementsCount,
    
            }
            setData(newData)
            //Error is set to null if there was one previously
            setError(null)
            //loading is set to false
            setLoading(false)

        }).catch(err=>{

            //Data is set to the default value
            setData(defaultData)

            //Error is displayed later in the Result component if there was one
            setError(err)

            //loading is set to false
            setLoading(false)
        })

    }, [currentSearchParams])

    //Updated once at the start of the application
    useEffect(()=>{
        Search(currentSearchParams, true)
    }, [])
    return {Search, error, loading, data}
}

//Hook to manage theme
export function useTheme(theme: string) : [boolean, (value:boolean) => void]
{
    //'theme' obtained in page.tsx, used to initialize 'isNightActive' state.
    const [isNightActive, setIsNightActive] = useState(theme === 'dark')

    //Called by the theme switch (in Header.tsx)
    function setNightActive(isNight: boolean)
    {
        //Converted boolean to string
        const newTheme = isNight ? 'dark' : 'light'

        //Updated state
        setIsNightActive(isNight)

        //The body theme is changed directly to show the changes quickly to the user.
        document.body.setAttribute('data-theme', newTheme)

        //fetch to a app route to save the changes in a cookie. We don't want to change here directly because
        //it causes a bug that updates the entire document on the first change.
        fetch('/api/cookies', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: 'data-theme', newVal: newTheme }),
          })
    }

    return [isNightActive, setNightActive]
}

//Hook to get an element from SWAPI using GraphQL
export function useGetElement()
{
    //useLazyQuery is a hook of Apollo that provides a function to call a graphql query, in this case, 'GET_ELEMENT'
    const [handleGetElement, {error, loading, data}] = useLazyQuery(GET_ELEMENT)

    //Gets the element with a SearchInput (id and type)
    function getElement(item: SearchInput){
        const data = handleGetElement({variables: {
                item
            }})
            return data

    }
    return {getElement, error, loading, data}
}
