'use client'
import ErrorDisplay from "@/app/components/Error";
import ItemDisplay from "@/app/components/ItemDisplay/ItemDisplay";
import LoadingScreen from "@/app/components/LoadingScreen";
import Header from "@/app/components/ui/Header";
import { getDataType } from "@/app/utils/categories";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useEffect, useState } from "react";

// Initializing Apollo Client
const client = new ApolloClient({
  uri: '/api/graphql',
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
    
    // id and type of the item that is requested on the url.
    const type = getDataType(params.category)
    const id = parseInt(params.id)

    // Used to hide the ugly page without styling before the styled-component library initialize.
    const [loading, setLoading] = useState(true)

    const [error, setError] = useState<Error |null>(null)
    useEffect(()=>{
      if(loading){
        setLoading(false)
      }
    }, [])
    useEffect(()=>{

        if(type === null) setError({name: `${params.category}?`, message: errors.typeError})
        if(Number.isNaN(id)) setError({name: `${params.id}?`, message: errors.idError})

    }, [params, id, type])


    //Displaying a loading screen until styles are loaded
    if(loading) return <LoadingScreen />
    return ( 
      // Providing client
        <ApolloProvider client={client}>
          <Header dataTheme={dataTheme} />
            {
              // if there is no error and type is valid, it displays the item
            !error && type !== null ?
              <ItemDisplay item={{id, type}} setError={(err: Error | null)=>setError(err)}/>
              : <ErrorDisplay error={error}/>
            }

        </ApolloProvider>
  )
}
//custom errors messages
const errors = {
  typeError: 'Invalid type. Please put a valid category.',
  idError: 'Invalid id. Please put a valid id.'
}