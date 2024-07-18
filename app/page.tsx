'use client'
import ResultDisplay from '@/app/components/IndexedSearch/ResultDisplay'
import { useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import fixSearchParams from './utils/fixSearchParams';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';

export default function Home({searchParams} :
  {
    searchParams?:{
      query?: string,
      page?: string,
      category?: string,
      order?: string,
      orderBy?: string
    }
  }) {
    const [loading, setLoading] = useState(true)
    const fixedSearchParams = fixSearchParams(searchParams)

    useEffect(()=>{
      setLoading(false)

      return ()=> setLoading(true)
    }, [])

    if(loading) return <LoadingScreen />

    return (
      <>
        <Header/>
        <ResultDisplay searchParams={fixedSearchParams}/>
        <Footer/>
      </>
  );
}

