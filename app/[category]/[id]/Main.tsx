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
    const [error, setError] = useState<Error |null>(null)
    useEffect(()=>{
      if(loading){
        setLoading(false)

      }
        if(type === null) setError({name: `${params.category}?`, message: errors.typeError})
        if(Number.isNaN(id)) setError({name: `${params.id}?`, message: errors.idError})

    }, [params])

    if(loading) return <LoadingScreen />
    return ( 
        <ApolloProvider client={client}>
          <Header dataTheme={dataTheme} />
            {
            !error && type !== null ?
              <ItemDisplay item={{id, type}} setError={(err: Error | null)=>setError(err)}/>
              : <ErrorDisplay error={error}/>
            }

        </ApolloProvider>
  )
}
const errors = {
  typeError: 'Invalid type. Please put a valid category.',
  idError: 'Invalid id. Please put a valid id.'
}