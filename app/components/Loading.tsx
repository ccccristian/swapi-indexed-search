import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Loading({loading, ...props} :{loading: boolean})
{
    const [currLogo, setCurrLogo] = useState(1)

    useEffect(()=>{
        setCurrLogo(Math.floor(5))

    }, [loading])

    if(!loading) return null
    return(
        <LoadingContainer >
            <Image
            src={`/icons/${currLogo}.svg`}
            alt="loading"
            width={50}
            height={50}
            className="loading-animation"
            {...props}/>
        </LoadingContainer>
    )
}



const LoadingContainer = styled.div`
    position: absolute;
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
`