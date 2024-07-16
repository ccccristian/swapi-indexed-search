import { ElementsCount, ResultList, SearchParams, SearchResult} from "@/app/utils/definitions";

import styled from "styled-components";
import Loading from "../Loading";
import ErrorDisplay from "../Error";
import Link from "next/link";
import { getCategory } from "@/app/utils/categories";
import { capitalize } from "@/app/utils/text-transform";
import CategorySelector from "./CategorySelector";
import Svg from "../ui/Svg";
import Options from "./Options";
import FilterOptions from "./FilterOptions";
import SearchTags from "./SearchTags";
import ResultsHeader from "./ResultsHeader";

export default function Results(
{resultList, loading, elementsCount, searchParams}: 
{
    resultList: ResultList | [],
    loading: boolean,
    searchParams: SearchParams,
    elementsCount: ElementsCount,
})
{
    const order = searchParams?.order ?? 'ascendant'
    const orderBy = searchParams?.orderBy ?? 'title'
    return(
        <Container>
            <Loading loading={loading}/>
            <ResultsHeader
                category={searchParams.category}
                elementsCount={elementsCount}
            />
            <ResultsBody>
                <Table>
                    <FilterOptions 
                    page={searchParams.page}
                    orderBy={orderBy} 
                    count={elementsCount.count ?? 0}
                    order={order}/>
                    <SearchTags searchParams={searchParams}/>
                        {          
                        !loading && resultList.length > 0 ? 
                            resultList.map((result, index)=>{
                                return <ResultComponent result={result} index={index} key={index}/>
                        })
                        : <ErrorDisplay message="No content found"/>
                    }

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
    <Link style={{width: '100%'}} href={`${getCategory(result.type)}/${result.element_id}`}>
    <Item style={{backgroundColor: even ? 'var(--tertiary)': 'var(--secondary)'} }>
        <TableItem>{result.title}</TableItem> 
        <TableItem >
            <TypeDisplay>
            <Svg name={result.type.toLowerCase()} width={30} height={30}/>
            <span>{capitalize(result.type)} </span>
            </TypeDisplay>
        </TableItem>
        
    </Item>
    </Link>
    )
}


const Container = styled.section`
    position: relative;
    background-color: var(--background2);
    min-height: 30rem;
    width: 80%;
`


const Table = styled.div`
    width: 60%;
    box-sizing: border-box;
    display: flex;
    margin: 0.3rem 0;
    flex-direction: column;
    justify-content: start;
    align-items: center;
background-color: var(--background2);
`

const Item = styled.div`
position: relative;
    color: var(--onPrimary);
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    margin: 0.3rem;
    border-radius: 0.3rem;
    &:hover::after{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--blue);
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
`