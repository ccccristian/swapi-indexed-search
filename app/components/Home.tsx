'use client'
import ResultDisplay from '@/app/components/IndexedSearch/ResultDisplay'
import { useEffect, useState } from 'react';
import LoadingScreen from './LoadingScreen';
import Header from './ui/Header';
import { InitialSearchParams } from '../utils/definitions';

export default function Home({searchParams, dataTheme} :
  {
    searchParams: InitialSearchParams,
    dataTheme: string
  }) {

    // Used to hide the ugly page without styling before the styled-component library initialize.
    const [loading, setLoading] = useState(true)

    //When component is mounted, loading is set to false
    useEffect(()=>{
      setLoading(false)
    }, [])
    //Displaying a loading screen until styles are loaded
    if(loading) return <LoadingScreen />

    return (
      <>
        <Header dataTheme={dataTheme}/>
        <ResultDisplay searchParams={searchParams}/>
      </>
  );
}

