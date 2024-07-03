'use client'
import ItemDisplay from "@/app/components/ItemDisplay/ItemDisplay";
import { getDataType } from "@/app/utils/categories";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import styled from "styled-components";


const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache()
})



export default function Page({ params }: { params: { id: string, category: string } }) {
    const type = getDataType(params.category)
    if(!type) return <p>404 NOT FOUND</p>

    return ( 
    <ApolloProvider client={client}>

        <ItemDisplay item={{id: parseInt(params.id), type}}/>
      </ApolloProvider>
  )
}
