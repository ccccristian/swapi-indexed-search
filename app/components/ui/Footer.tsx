'use client'
import { getCookie, setCookie } from "@/app/utils/get-cookies";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Footer()
{
    const [isDark, setIsDark] = useState(false)

    useEffect(()=>{
        getCookie('data-theme').then(res=>{
            setIsDark(res?.value === 'dark')
        })
    })


    return(
        <Container title="Visit Portfolio">
            <Link href={"https://meza-cristian.vercel.app/"}>
                
                <Image src={isDark ? "/loading.gif" : "/loading-dark.gif"}
                    width={50}
                    height={50}
                    alt="Meza Cristian"
                />
            </Link>
        </Container>
    )
}
const Text = styled.p`
    font-weight: 500;
    font-size: 0.9rem;
    margin: 0.5rem;
`
const Container = styled.footer`
    width: fit-content;
    height: auto;
    margin: 0 auto;
    display: flex;
    padding: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`