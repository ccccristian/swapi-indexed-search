import styled from "styled-components"
import SearchBar from "./SearchBar"
import { DataType, ElementsCount } from "@/app/utils/definitions"
import { capitalize } from "@/app/utils/text-transform"
import CategorySelector from "./CategorySelector"

export default function ResultsHeader({category, elementsCount}:{
    category: Array<DataType>,
    elementsCount: ElementsCount
})
{
    return(
        <Header>
        <HeaderItem >
                <SearchBar />
            <p>SWAPI {category[0] && capitalize(category[0])} Content <small>/ {elementsCount?.count ?? 0} Found</small></p>
                
            </HeaderItem>
                <CategorySelector category={category[0] ?? ''} elementsCount={elementsCount}/>
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
    position: relative;
    width: 100%;
    box-sizing: border-box;
    font-size: 0.9rem;
    margin: 0;
    display:flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    z-index: 10;
    padding: 1rem 1rem 0 1rem;
    & p{
        font-size: 2rem;
        font-weight: 600;
        width: 100%;
        margin-bottom: 1rem
    }
    & small{
        font-size: 1.3rem;
        opacity: 80%;
    }
`