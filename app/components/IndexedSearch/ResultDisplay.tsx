'use client'
import {  useEffect, useState } from 'react'
import Results from '@/app/components/IndexedSearch/Results'
import styled from 'styled-components'
import { useSearch } from '@/app/utils/custom-hooks'
import { ElementsCount, ResultList, SearchParams } from '@/app/utils/definitions'
import PaginationComponent from './PaginationComponent'
import Header from '../ui/Header'

export default function ResultDisplay({searchParams}:{
    searchParams: SearchParams
}){

    const [resultList, setResultList] = useState<{elements: ResultList, elementsCount: ElementsCount}>({elements: [], elementsCount: {}})
    const {Search, called, loading, data} = useSearch()
    
    useEffect(()=>{
        const fetchData = ()=>
        {
            Search(searchParams).then((response)=>{
                setResultList(e=> response)
            })
        }
        fetchData()
        // return ()=> setResultList([])
    }, [searchParams])

    return(
        <Container>
            <Header/>

            <Results searchParams={searchParams} loading={loading} resultList={resultList.elements} elementsCount={resultList.elementsCount}/>
            {
                !loading && resultList && resultList.elements.length > 0 &&
                <PaginationComponent currentPage={searchParams.page} count={resultList.elementsCount.currentCount ?? 0}/>
            }
        </Container>
    )
}




const Container = styled.main`

    width: 100%;
    display: flex;
    margin-bottom: 3rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
`

