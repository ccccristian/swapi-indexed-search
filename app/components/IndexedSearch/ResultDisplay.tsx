'use client'
import {  useEffect, useState } from 'react'
import SearchBar from '@/app/components/IndexedSearch/SearchBar'
import Results from '@/app/components/IndexedSearch/Results'
import styled from 'styled-components'
import { useSearch } from '@/app/utils/custom-hooks'
import { ElementsCount, ResultList } from '@/app/utils/definitions'
import PaginationComponent from './PaginationComponent'
import Header from '../ui/Header'

export default function ResultDisplay({query, currentPage, category, order}:{
    query?: string,
    currentPage?: number,
    category?: string
    order: string
}){

    const [resultList, setResultList] = useState<{elements: ResultList | [], elementsCount: ElementsCount}>({elements: [], elementsCount: {}})
    const {Search, called, loading, data} = useSearch()

    useEffect(()=>{
        const fetchData = ()=>
        {
            Search(query, currentPage, category, order).then((response)=>{
                setResultList(e=> response)
            })
        }

            fetchData()
        // return ()=> setResultList([])
    }, [query, currentPage, category, order])

    return(
        <ResultDisplayContainer>
            <Header/>

            <Results order={order} loading={loading} category={category} resultList={resultList.elements} elementsCount={resultList.elementsCount}/>
            {
                !loading && resultList && resultList.elements.length > 0 &&
                <PaginationComponent currentPage={currentPage ?? 0} count={resultList.elementsCount.currentCount ?? 0}/>
            }
        </ResultDisplayContainer>
    )
}

const ResultDisplayContainer = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
`

