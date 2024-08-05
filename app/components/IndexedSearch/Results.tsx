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
{resultList, reload, error, loading, elementsCount, searchParams, handleChangeParam}: 
{
    resultList: ResultList | [],
    loading: boolean,
    error: Error | null,
    reload: ()=> void,
    searchParams: SearchParams,
    elementsCount: ElementsCount,
    handleChangeParam: (param: string, value?: string) => void
})
{
    return(
        <Container>
            {/* Search bar, category selector */}
            <ResultsHeader
                category={searchParams.category}
                elementsCount={elementsCount}
                query={searchParams.query}
                handleChangeParam={handleChangeParam}
            />
            {/* Order, order by */}
            <FilterOptions 
                loading={loading}
                page={searchParams.page}
                orderBy={searchParams.orderBy} 
                count={elementsCount.currentCount ?? 0}
                order={searchParams.order}
                handleChangeParam={handleChangeParam}
            />
            {/* Items display */}
            <ResultsBody>
                <Table >
                    <SearchTags searchParams={searchParams} handleChangeParam={handleChangeParam}/>
                    <ItemList className="item-fade-in">
                        {          
                        !error &&
                            resultList.map((result, index)=>{
                                return <ResultComponent result={result} key={index}/>
                        })
                        }
                    </ItemList>

                    <ErrorDisplay error={error} reload={reload}/>
                </Table>

                {/* Categoriy selector*/}
                <Options 
                category={searchParams.category}
                handleChangeParam={handleChangeParam}
                
                />
                    
            </ResultsBody>
        </Container>


    )
}

function ResultComponent({result} : {result: SearchResult})
{
    return (
        <div className="item">
            {/* Link to Item display page (fetch to SWAPI) */}
            <Link href={`${getCategory(result.Type)}/${result.ElementID}`}>
                <Item>
                    <TableItem>{result.Title}</TableItem> 
                    <TableItem >
                        <TypeDisplay>
                            <Svg name={result.Type.toLowerCase()} width={30} height={30}/>
                            <span>{capitalize(result.Type)}</span>
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
    & .item{
        border-radius: 0.3rem;
        background-color: var(--tertiary);
        
    }
    & .item:nth-child(even) {
        background-color: var(--secondary);
    }
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
