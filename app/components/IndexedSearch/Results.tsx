import { ElementsCount, ResultList, SearchParams, SearchResult} from "@/app/utils/definitions";

import styled from "styled-components";
import ErrorDisplay from "../Error";
import Link from "next/link";
import { getCategory } from "@/app/utils/categories";
import { capitalize } from "@/app/utils/text-transform";
import Svg from "../ui/Svg";
import Options from "./Options";
import FilterOptions from "./FilterOptions";
import SearchTags from "./SearchTags";
import ResultsHeader from "./ResultsHeader";
import { devices } from "@/app/utils/screenSizes";

export default function Results(
{resultList, reload, error, loading, elementsCount, searchParams}: 
{
    resultList: ResultList | [],
    loading: boolean,
    error: Error | null,
    reload: ()=> void,
    searchParams: SearchParams,
    elementsCount: ElementsCount,
})
{
    const order = searchParams?.order ?? 'ascendant'
    const orderBy = searchParams?.orderBy ?? 'title'
    return(
        <Container>

            <ResultsHeader
                category={searchParams.category}
                elementsCount={elementsCount}
                query={searchParams.query}
            />
                <FilterOptions 
                    loading={loading}
                    page={searchParams.page}
                    orderBy={orderBy} 
                    count={elementsCount.currentCount ?? 0}
                    order={order}/>
            <ResultsBody>
                <Table >
                    <SearchTags searchParams={searchParams}/>
                    <ItemList className="item-fade-in">
                        {          
                        !error &&
                            resultList.map((result, index)=>{
                                return <ResultComponent result={result} index={index} key={index}/>
                        })
                        }
                    </ItemList>

                    <ErrorDisplay error={error} reload={reload}/>
                </Table>
                <Options category={searchParams.category}/>
                    
            </ResultsBody>
        </Container>


    )
}

function ResultComponent({result, index} : {result: SearchResult, index: number})
{
    const even = index % 2 === 0
    return (
        <div className="item">
        <Link style={{width: '100%'}} href={`${getCategory(result.Type)}/${result.ElementID}`}>
        <Item style={{backgroundColor: even ? 'var(--tertiary)': 'var(--secondary)'} }>
            <TableItem>{result.Title}</TableItem> 
            <TableItem >
                <TypeDisplay>
                <Svg name={result.Type.toLowerCase()} width={30} height={30}/>
                <span>{capitalize(result.Type)} </span>
                </TypeDisplay>
            </TableItem>
            
        </Item>
        </Link>
        </div>
    )
}


const Container = styled.section`
    position: relative;
    background-color: var(--background2);
    min-height: 100vh;
    width: 100%;
`


const ItemList = styled.div`
width: 100%;
`

const Table = styled.div`
    width: 95%;
    box-sizing: border-box;
    display: flex;
    position: relative;
    margin: 0.3rem 0;
    padding-bottom: 3rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--background2);
    @media ${devices.tablet}{
        width: 70%;
        padding-left: 3rem;
    }
    @media ${devices.laptop}{
        width: 60%;
        padding-left: 3rem;
    }
`

const Item = styled.div`
position: relative;
    color: var(--onPrimary);
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 0.5rem;
    border-radius: 0.3rem;
    &:hover::after{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--light);
        opacity: 8%;
    }
`

const TableItem = styled.div`
    height: 5rem;
    padding: 1rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    font-weight: 500;

`
const TypeDisplay = styled.div`
    display: flex;
    align-items: center;
    width: 10rem;
    & span{
        font-weight: 700;
        margin-left: 1rem

    }

`
const ResultsBody = styled.div`
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    @media ${devices.tablet}{
        flex-direction: row;
        justify-content: start;
        align-items: start;

    }
`
// const ResultsBody = styled.div`
//     display: flex;
// `
// Original






// const TypeDisplay = styled.div`
//     display: flex;
//     align-items: center;
//     width: 10rem;
//     & span{
//         font-weight: 700;
//         margin-left: 1rem

//     }
// `
