import styled from "styled-components";
import Svg from "./ui/Svg";

//Small loading component.
export default function Loading({loading, ...props} :{loading: boolean})
{
    if(!loading) return null
    return(
        <LoadingContainer >
            <div className="loading-animation">
                <Svg
                name={`loading`}
                width={30}
                height={30}
                {...props}/>
            </div>
        </LoadingContainer>
    )
}



const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    width: 5rem;
    justify-content: center;
`
