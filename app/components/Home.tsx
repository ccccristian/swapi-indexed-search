'use client'
import ResultDisplay from '@/app/components/IndexedSearch/ResultDisplay'
import { useEffect, useState } from 'react';
import LoadingScreen from './LoadingScreen';
import Header from './ui/Header';

export default function Home({searchParams, dataTheme} :
  {
    searchParams?:{
      query?: string,
      page?: string,
      category?: string,
      order?: string,
      orderBy?: string
    },
    dataTheme: string
  }) {
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
      setLoading(false)
    }, [])
    
    if(loading) return <LoadingScreen />

    return (
      <>
        <Header dataTheme={dataTheme}/>
          <ResultDisplay searchParams={searchParams}/>
      </>
  );
}

