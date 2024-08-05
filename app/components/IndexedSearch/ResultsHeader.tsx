import styled from "styled-components"
import SearchBar from "./SearchBar"
import { DataType, ElementsCount } from "@/app/utils/definitions"
import { capitalize } from "@/app/utils/text-transform"
import CategorySelector from "./CategorySelector"
import { devices } from "@/app/utils/screenSizes"

export default function ResultsHeader({category, query, elementsCount, handleChangeParam}:{
    category: Array<DataType>,
    elementsCount: ElementsCount,
    query: string,
    handleChangeParam: (param: string, value?: string) => void
})
{
    return(
        <Header>
        <HeaderItem >
                <SearchBar query={query} handleChangeParam={handleChangeParam}/>
            <p>SWAPI {category[0] && capitalize(category[0])} Content <small>/ {elementsCount?.currentCount ?? 0} Found</small></p>
                
            </HeaderItem>
                <CategorySelector handleChangeParam={handleChangeParam} category={category[0] ?? ''} elementsCount={elementsCount}/>
        </Header>
    )
}

const Header = styled.div`
    width: 100% ;
    font-weight: 600;
    background-color: var(--onSecondary);
    color: var(--primary);
    font-weight: 400;
    height: fit-content;
`
const HeaderItem = styled.div`
    //To make the search bar animation work
    position: relative;
    z-index: 10;

    width: 100%;
    box-sizing: border-box;
    display:flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1rem;
    padding-bottom: 0;
    & p{
        font-size: 1.3rem;
        font-weight: 600;
        width: 100%;
        margin-bottom: 1rem
    }
    & small{
        font-size: 0.8rem;
        opacity: 80%;
    }
    @media ${devices.mobileM}{
        & p {
            font-size: 1.5rem;
        }
        & small{
            font-size: 1rem;
        }
    }
    @media ${devices.tablet}{
        & p {
            font-size: 2rem;

        }
        & small{
            font-size: 1.3rem;
        }
    }
`
