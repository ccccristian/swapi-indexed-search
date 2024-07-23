import styled from "styled-components";
import Svg from "./ui/Svg";

export default function ErrorDisplay({error} : {error: Error})
{
    return(
        <ErrorDisplayContainer>
        <Svg
            name="notFound"
            width={50}
            height={50}
        />
        <Name>{error.name}</Name>
        <Message>{error.message}</Message>
        </ErrorDisplayContainer>

    )
}

const ErrorDisplayContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 30rem;
    padding-top: 3rem;
    justify-content: start;
    align-items: center;
`

const Name = styled.h3`
    font-size: 1.3rem;
    margin-top: 1rem;
`

const Message = styled.p`
    font-size: 1rem;
    margin-top: 1rem;
`