'use client'
import ItemDisplay from "@/app/components/ItemDisplay/ItemDisplay";
import Header from "@/app/components/ui/Header";
import { getDataType } from "@/app/utils/categories";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";


const client = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache()
})



export default function Page({ params }: { params: { id: string, category: string } }) {
    const type = getDataType(params.category)
    if(!type) return <p>404 NOT FOUND</p>

    return ( 
    <ApolloProvider client={client}>
      <Header/>
        <ItemDisplay item={{id: parseInt(params.id), type}}/>
      </ApolloProvider>
  )
}
