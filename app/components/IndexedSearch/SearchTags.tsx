'use client'
import { SearchParams } from "@/app/utils/definitions"
import FeatherIcon from "feather-icons-react"
import { useSearchParams } from "next/navigation"
import styled from "styled-components"

export default function SearchTags({searchParams, handleChangeParam} : {searchParams: SearchParams, handleChangeParam: (param: string, value?: string) => void}){

    const keys = Object.keys(searchParams ?? {})

    
    const _searchParams = useSearchParams()

    const params = new URLSearchParams(_searchParams)

    const categories : Array<{key:string, value: string}> = keys.flatMap(key=> 
        {
            const value = params.get(key)
            if(!value || key === 'page') return []
            return(
                {key, value}
            )

        })

    const handleDeleteProp = (category: string)=> handleChangeParam(category, '')

    return(
        <Container>
            {
                categories.map((category, index) =>{
                    return(
                        <CategoryComponent key={index} handleDeleteProp={()=>handleDeleteProp(category.key)} name={category.value}/>
                    )
                })
            }
        </Container>
    )
}

function CategoryComponent({name, handleDeleteProp} : {name: string, handleDeleteProp: ()=> void})
{
    return(
        <Category>
            <Name>{name}</Name>
            <button type="button" style={{backgroundColor: 'transparent'}} onClick={handleDeleteProp}>

            <FeatherIcon icon="x" size={13}/>
            </button>
        </Category>
    )
}

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    width: 100%;
    padding-left: 1rem;
`

const Category = styled.div`
    color: var(--onSecondary);
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.3rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
    background-color: var(--primary);

`
const Name = styled.span`

    white-space: nowrap;
    height: 1rem;

`