'use client'
import {  useCallback, useMemo } from 'react'
import Results from '@/app/components/IndexedSearch/Results'
import styled from 'styled-components'
import { useSearch } from '@/app/utils/custom-hooks'
import { InitialSearchParams } from '@/app/utils/definitions'
import PaginationComponent from './PaginationComponent'
import fixSearchParams from '@/app/utils/fixSearchParams'
import { usePathname, useRouter} from 'next/navigation'


export default function ResultDisplay({searchParams}:{
    searchParams: InitialSearchParams,
}){
    //Converts all searchParams variables from any string or undefined to more specific type or default value in case of undefined
    const fixedSearchParams = useMemo(() => fixSearchParams(searchParams), [searchParams]);

    //Hook that provides a function to fetch the data using search params.
    const {Search, error, loading, data } = useSearch(fixedSearchParams)

    //Used to change url props
    const pathname = usePathname()
    const {replace} = useRouter() 

    //Changes url props and calls search function to update the data according to the new params
    const handleChangeParam = useCallback((param: string, value?: string) =>
        {
            const params: URLSearchParams = new URLSearchParams(searchParams)

            //If the param to change is not the page, page is set to the first. This is to avoid bugs.
            //If the newest url params has only fifteen results, for example, and previously the app was on the page twenty five,
            //the app will display 'no content found', and the user will need to change to a valid page (1 or 2) manually.
            if(param !== 'page') params.set('page', '1');

            if(value){
                params.set(param, value)
            }else{
                //If value is falsy, param is deleted
                params.delete(param)
            }
            //Url params update
            replace(`${pathname}?${params.toString()}`)

            //Search with the newest searchParams.
            const newFixedSearchParams = fixSearchParams(Object.fromEntries(params))
            Search(newFixedSearchParams)

        }, [Search, pathname, replace, searchParams])
    return(
        <Container>
            <Results 
            error={error} 
            // Forced search with current fixedSearchParams
            reload={()=>{Search(fixedSearchParams, true)}} 
            searchParams={fixedSearchParams} 
            loading={loading} 
            resultList={data.elements} 
            handleChangeParam={handleChangeParam}
            elementsCount={data.elementsCount}/>
            {
                
                !loading && !error && data && data.elements.length > 0 &&
                <PaginationComponent 
                currentPage={fixedSearchParams.page} 
                count={data.elementsCount.currentCount ?? 0}
                handleChangeParam={handleChangeParam}
                />
            }
        </Container>
    )
}




const Container = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
`

