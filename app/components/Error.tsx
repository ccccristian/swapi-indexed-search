import styled from "styled-components";
import Svg from "./ui/Svg";
import FeatherIcon from "feather-icons-react";

export default function ErrorDisplay({error, reload} : {
    error: Error | null,
    reload?: () => void 
})
{
    if(!error) return null
    return(
        <ErrorDisplayContainer>
        <Svg
            name="notFound"
            width={50}
            height={50}
        />
        <Name>{error.name}</Name>
        <Message>{error.message}</Message>
        {
            reload && 
            <Refresh type="button" onClick={reload}>
                <FeatherIcon icon="refresh-cw" />
            </Refresh>
        }
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
    margin: 1rem 0;
`
const Refresh = styled.button`
    cursor: pointer;
    color: inherit;
    background-color: transparent;
`