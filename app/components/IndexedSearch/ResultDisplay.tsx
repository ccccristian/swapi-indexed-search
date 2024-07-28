'use client'
import {  useEffect, useState } from 'react'
import Results from '@/app/components/IndexedSearch/Results'
import styled from 'styled-components'
import { useSearch } from '@/app/utils/custom-hooks'
import { ElementsCount, ResultList, SearchParams } from '@/app/utils/definitions'
import PaginationComponent from './PaginationComponent'
import fixSearchParams, { searchParamsAreEqual } from '@/app/utils/fixSearchParams'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache()
  })
  
export default function ResultDisplay({searchParams}:{
    searchParams?:{
        query?: string,
        page?: string,
        category?: string,
        order?: string,
        orderBy?: string
      }
}){
    const [fixedSearchParams, setFixedSearchParams] = useState<SearchParams>(fixSearchParams(searchParams))

    const [resultList, setResultList] = useState<{elements: ResultList, elementsCount: ElementsCount}>({elements: [], elementsCount: {}})
    const {Search, error, loading, data} = useSearch()
    useEffect(()=>{
        handleSearch()
    }, [searchParams])
    function handleSearch(){
        const newSearchParams = fixSearchParams(searchParams)
        if (!searchParamsAreEqual(newSearchParams, fixedSearchParams) ||!data){
            setFixedSearchParams(newSearchParams)
            Search(newSearchParams).then((response)=>{

                setResultList(e=> response)
            })
          }
    }
    return(
        <ApolloProvider client={client}>
            <Container>
                <Results error={error} reload={()=>{handleSearch()}} searchParams={fixedSearchParams} loading={loading} resultList={resultList.elements} elementsCount={resultList.elementsCount}/>
                {
                    !loading && resultList && resultList.elements.length > 0 &&
                    <PaginationComponent currentPage={fixedSearchParams.page} count={resultList.elementsCount.currentCount ?? 0}/>
                }
            </Container>
        </ApolloProvider>
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

