'use client'
import { SearchInput } from "@/app/utils/definitions";
import styled from "styled-components";
import { useGetElement } from "@/app/utils/custom-hooks";
import { useEffect } from "react";
import Values from "./Values";
import LoadingScreen from "../LoadingScreen";
import { clearValue } from "@/app/utils/text-transform";
import Svg from "../ui/Svg";
import ErrorDisplay from "../Error";


export default function ItemDisplay(
    {item}: 
    {
        item: SearchInput | null, 
    }){
        const {getElement, error, loading, data} = useGetElement()
        const Data = data?.getElement
        let title = Data?.name ?? Data?.title

        useEffect(()=>{
            if(item) getElement(item)
                
            if(Data){
                document.title = `${title} - SWAPI Indexed Search`
            }
        }, [item])
        return(
            <ItemDisplayWindow>
                {
                    loading &&
                    <LoadingScreen/>
                }
                {
                    error &&
                    <ErrorDisplay error={error}/>
                }

                {
                    item && data?.getElement && 
                    <Properties>
                    <thead>
                        <Header>
                            <HeaderItem colSpan={2}>
                                    <HeaderLogo>
                                        <Svg 
                                        name={item.type.toLowerCase()}
                                        width={50}
                                        height={50}
                                        />
                                    </HeaderLogo>
                                        <span>{title}</span>
                            </HeaderItem>
                        </Header>
                    </thead>
                    <tbody >
                    {

                        Object.keys(data?.getElement).map((key: string, index)=>{
                            return(
                            <Property key={key} style={{backgroundColor: index%2==0 ? 'var(--secondary)': 'var(--tertiary)'}}>
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
    overflow: hidden;
    width: 100%;
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
    padding: 1rem;
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
    margin: 2rem 0;
    & span{
        font-weight: 700;
        display: block;
        font-size: 1.3rem;
    }
`
const HeaderLogo = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 1rem;
`