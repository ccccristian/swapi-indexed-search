'use client'
import { DataType, SearchInput } from "@/app/utils/definitions";
import styled from "styled-components";
import { useGetElement } from "@/app/utils/custom-hooks";
import { useEffect } from "react";
import Values from "./Values";
import LoadingScreen from "../LoadingScreen";
import { capitalize, clearValue } from "@/app/utils/text-transform";
import Image from "next/image";


export default function ItemDisplay(
    {item}: 
    {
        item: SearchInput | null, 
    }){
        const {getElement, error, loading, data} = useGetElement()
        useEffect(()=>{
            if(item){
                getElement(item).then(res=>{
                    let title = res.data.getElement.name ?? res.data.getElement.title

                    if(title){
                        document.title = `${title} - SWAPI Indexed Search`
                    }
                })
            }
            
        }, [item])
        return(
            <ItemDisplayWindow>
                {
                    loading &&
                    <LoadingScreen/>
                }
                {
                    error && <div>
                        <h1>{error.name}</h1>
                        <h2>{error.message}</h2>
                    </div>
                }

                {
                    item && data?.getElement && 
                    <Properties>
                    <thead>
                        <Header>
                            <HeaderItem colSpan={2}>
                                    <Image 
                                    src={`/data-types/${item.type}.svg`}
                                    alt={item.type}
                                    width={50}
                                    height={50}
                                    />
                                    {
                                        item.type === "FILM"
                                        ?<span>{data.getElement['title']}</span>
                                        :<span>{data.getElement['name']}</span>
                                    
                                    }

                            </HeaderItem>
                        </Header>
                    </thead>
                    <tbody >
                    {

                        Object.keys(data?.getElement).map((key: string, index)=>{
                            return(
                            <Property key={key} style={{backgroundColor: index%2==0 ? 'var(--secondary)': 'transparent'}}>
                                <Td>{clearValue(key)}</Td>
                                <Values value={data.getElement[key]}>

                                </Values>
                            </Property>
                            )
                        })
                    }
                    </tbody>
   
                </Properties>
                }

            </ItemDisplayWindow>
        )
}


const ItemDisplayWindow = styled.div`
    border-radius: 0.3rem;
    overflow: hidden;
    width: 45rem;
    min-height: 16rem;
    position: relative;
    margin: 0 auto;
`
const Property = styled.tr`
    width: 100%;
    font-size: 1.1rem;
    outline: none;
`
const Properties = styled.table`
    width: 100%;
    outline: none;
    border-spacing: 0;
`
const Td = styled.td`
    outline: none;
    font-weight: 700;
    padding: .3rem
`
const Header = styled.tr`
    font-weight: 600;
    background-color: var(--onSecondary);
    color: var(--primary);
`
const HeaderItem = styled.td`
    width: 100%;
    height: 5rem;
    padding: 1rem;
    text-align: center;
    box-sizing: border-box;
    margin: 1rem 0;
    & span{
        font-weight: 700;
        margin-left: 1rem;
        display: block;
        font-size: 1.3rem;
    }
`
