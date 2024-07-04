import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Svg from "./ui/Svg";

export default function Loading({loading, ...props} :{loading: boolean})
{
    const [currLogo, setCurrLogo] = useState(1)

    useEffect(()=>{
        setCurrLogo(Math.floor(5))

    }, [loading])

    if(!loading) return null
    return(
        <LoadingContainer >
            <div className="loading-animation">
                <Svg
                name={`${currLogo}`}
                width={50}
                height={50}
                {...props}/>
            </div>
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