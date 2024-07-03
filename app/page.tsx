'use client'
import ResultDisplay from '@/app/components/IndexedSearch/ResultDisplay'
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import LoadingScreen from './components/LoadingScreen';
import HorizontalScroll from './components/ui/HorizontalScroll';

export default function Home({searchParams} :
  {
    searchParams?:{
      query?: string,
      page?: string,
      category?: string,
      order?: string
    }
  }) {
    const query = searchParams?.query || ''
    const order = searchParams?.order || 'ascendant'
    const currentPage = Number(searchParams?.page) || 1
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
      setLoading(false)

      return ()=> setLoading(true)
    }, [])

    if(loading) return <LoadingScreen />

    return (
      <>
        <ResultDisplay query={query} currentPage={currentPage} order={order} category={searchParams?.category}/>
      </>

  );
}

