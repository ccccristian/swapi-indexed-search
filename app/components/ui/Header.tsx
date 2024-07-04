import styled from "styled-components"
import Switch from "./Switch"
import { useEffect, useState } from "react"
import Svg from "./Svg"
import {getCookie, setCookie} from "@/app/utils/get-cookies"

export default function Header(){
    const [isNightActive, setIsNightActive] = useState<boolean | null>(null)
    useEffect(()=>{
        if(isNightActive === null){
            getCookie('data-theme').then(res=>{
                setIsNightActive(res?.value === 'dark')
            })
        }else{
            setCookie('data-theme', isNightActive ? 'dark' : 'light')
        }
    }, [isNightActive])
    useEffect(()=>{
        
    }, [isNightActive])

    return(
        <HeaderContainer>
            <Title>
                <Svg name="logo" width={110} color="var(--blue)"/>
                 Indexed Search</Title>
                 <Options>
                    <Switch active={isNightActive ?? false} setActive={(newval: boolean)=>setIsNightActive(newval)}/>
                    <Link target="_blank" href="https://github.com/ccccristian/swapi-indexed-search">
                        <Svg name="github" width={30} height={30}/>
                    </Link>
                 </Options>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: var(--background);
    width: 100%;
    margin: 0;
    height: 5rem;
    z-index: 15;
    top: 0;
`

const Options = styled.div`
    display: flex;
    margin-right: 3rem;
    align-items: center;
`
const Title = styled.h1`
    position: absolute;
    display: flex;
    left: 0;
    text-align: center;
    margin-left: 1rem;
    font-size: 1.5rem;
    justify-content: space-around;
    align-items: center;
    width: 22rem;
    font-weight: 500;
`
const Link = styled.a`
    margin-left: 1rem;
`