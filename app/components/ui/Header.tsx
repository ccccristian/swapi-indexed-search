import styled from "styled-components"
import Switch from "./Switch"
import Svg from "./Svg"
import Link from "next/link"
import { useTheme } from "@/app/utils/custom-hooks"
import { devices } from "@/app/utils/screenSizes"

export default function Header({dataTheme} : {dataTheme: string}){
    const [isNightActive, setIsNightActive] = useTheme(dataTheme)

    return(
        <HeaderContainer>
            <Title>
                <Link href="/">
                    <Svg name="logo" width='8rem' height='auto' color="var(--light)"/>
                    <h1>Indexed Search</h1>
                </Link>
            </Title>
            <Options>
            <Switch active={isNightActive ?? false} setActive={(newval: boolean)=> setIsNightActive(newval)}/>
            <A target="_blank" href="https://github.com/ccccristian/swapi-indexed-search">
                <Svg name="github" color="var(--primary)" width='3rem' height='3rem'/>
            </A>
            </Options>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--onSecondary);
    width: 100%;
    margin: 0;
    z-index: 15;
    color: var(--primary);
`

const Options = styled.div`
    display: flex;
    margin-right: 1rem;
    align-items: end;
`
const Title = styled.div`
    text-align: center;
    margin: 1rem 2rem ;
    font-size: 1rem;
    font-weight: 500;
    & a h1{
        margin-top: 0.5rem;
    }

    @media ${devices.mobileL}{
        & a{
            display: flex;
            align-items: end;
            & h1{
                margin-left: 0.7rem;
                font-size: 1.2rem;
            }
        }
    }
    @media ${devices.tablet}{
        & a h1{
            font-size: 1.5rem;
            margin-left: 1.2rem;
        }
    }
`
const A = styled.a`
    margin-left: 1rem;
`
