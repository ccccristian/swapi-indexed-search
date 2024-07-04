import styled from "styled-components";
import Svg from "./ui/Svg";

export default function ErrorDisplay({message} : {message: string})
{
    return(
        <ErrorDisplayContainer>
        <Svg
            name="notFound"
            width={50}
            height={50}
        />
        <Message>{message}</Message>
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

const Message = styled.h3`
    font-size: 1.3rem;
    margin-top: 1rem;
`