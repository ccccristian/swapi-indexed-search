import Image from "next/image";
import styled from "styled-components";

export default function ErrorDisplay({message} : {message: string})
{
    return(
        <ErrorDisplayContainer>
        <Image
        src="icons/not-found.svg"
        alt="No items found"
        width={50}
        height={50}
        />
        <h3>{message}</h3>
        </ErrorDisplayContainer>

    )
}

const ErrorDisplayContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;

`