'use client'
import ErrorDisplay from "@/app/components/Error";
import ItemDisplay from "@/app/components/ItemDisplay/ItemDisplay";
import LoadingScreen from "@/app/components/LoadingScreen";
import Header from "@/app/components/ui/Header";
import { getDataType } from "@/app/utils/categories";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useEffect, useState } from "react";


const client = new ApolloClient({
  uri: 'https://swapi-indexed-search.vercel.app/api/graphql',
  cache: new InMemoryCache(),
  
})


export default function Page({ params, dataTheme }: 
    { 
        params: 
        { 
            id: string, 
            category: string 
        },
        dataTheme: string
    }) {
    const type = getDataType(params.category)
    const id = parseInt(params.id)
    const [loading, setLoading] = useState(true)

  

    useEffect(()=>{
      setLoading(false)
    }, [])
      
    if(type === null) return(
      <>
          <Header dataTheme={dataTheme}/>
          <ErrorDisplay error={{name: `${params.category}?`, message: 'Invalid type. Please put a valid category.'}}/>
      </>
    )
    if(Number.isNaN(id)) return(
      <>
          <Header dataTheme={dataTheme}/>
          <ErrorDisplay error={{name: `${params.id}?`, message: 'Invalid id. Please put a valid id.'}}/>
      </>
    )
    console.log(typeof id)
    if(loading) return <LoadingScreen />
    return ( 
        <>
        <ApolloProvider client={client}>
          <Header dataTheme={dataTheme}/>
          {
            type !== null && typeof id === 'number' &&
              <ItemDisplay item={{id, type}}/>
            }

        </ApolloProvider>
        </>
  )
}
