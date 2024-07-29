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
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
      setLoading(false)
    }, [])
    
    if(loading) return <LoadingScreen />
    return ( 
        <>
        <ApolloProvider client={client}>
          <Header dataTheme={dataTheme}/>
          {
            type !== null ?
              <ItemDisplay item={{id: parseInt(params.id), type}}/>
            : <ErrorDisplay error={{name: `${params.category}?`, message: 'Invalid type. Please put a valid category.'}}/>
            }
        </ApolloProvider>
        </>
  )
}
