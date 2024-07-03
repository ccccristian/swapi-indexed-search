import { ElementsCount, ResultList} from "@/app/utils/definitions";

import styled from "styled-components";
import Loading from "../Loading";
import { Button } from "../StyledComponents";
import ErrorDisplay from "../Error";
import Link from "next/link";
import { getCategory } from "@/app/utils/categories";
import Image from "next/image";
import { capitalize } from "@/app/utils/text-transform";
import CategorySelector from "./CategorySelector";
import SearchBar from "./SearchBar";
import SortBy from "./SortBy";
import Svg from "../ui/Svg";

export default function Results(
{resultList, loading, category, elementsCount, order}: 
{
    resultList: ResultList | [],
    loading: boolean,
    order: string,
    category?: string,
    elementsCount: ElementsCount,
})
{
    return(
        <Container>
            <Loading loading={loading}/>
            <Header>
                <HeaderItem >
                        <SearchBar order={order}/>
                    <p>SWAPI {category && capitalize(category)} Content <small>/ {elementsCount?.count ?? 0} Found</small></p>
                    
                </HeaderItem>
                    <CategorySelector order={order} category={category} elementsCount={elementsCount}/>
            </Header>
        <Table>
            <thead>
                <tr>
                    <TableHeaderItem style={{backgroundColor: 'transparent'}}><span>Name</span></TableHeaderItem> 
                    <TableHeaderItem style={{backgroundColor: 'transparent'}}><span>Type</span></TableHeaderItem> 
                    <TableHeaderItem style={{backgroundColor: 'transparent'}}></TableHeaderItem> 
                </tr>
            </thead>
            <tbody>
            {          
            !loading &&
                resultList.map((result, index)=>{
                    const even = index % 2 === 0
                    return <Result key={index}>
                            <TableItem style={{backgroundColor: even ? 'var(--tertiary)': 'transparent'} }>{result.title}</TableItem> 
                            <TableItem style={{backgroundColor: even ? 'var(--tertiary)': 'transparent'} }>
                                <TypeDisplay>
                                <Svg name={result.type.toLowerCase()} width={30} height={30}/>
                                <span>{capitalize(result.type)} </span>
                                </TypeDisplay>
                            </TableItem>
                            <TableItem style={{backgroundColor: even ? 'var(--tertiary)': 'transparent'} }>
                                <Link href={`${getCategory(result.type)}/${result.element_id}`}>
                                    <Button className="button" type="button">
                                        <span>Inspect</span>
                                    </Button>
                                    
                                    </Link>
                            </TableItem>
                        </Result>
            })}
            </tbody>
                
        </Table>
            {!loading && resultList.length <= 0
            && <ErrorDisplay message="No content found"/>
            }
        </Container>


    )
}
const Container = styled.div`
    position: relative;
    background-color: var(--secondary);
    margin-top: 1rem;
    border-radius: 0.3rem;
    min-height: 30rem;
    width: 80%;

`


const Table = styled.table`
    border-spacing: 0;
    width: 100%;
`

const Result = styled.tr`
    color: var(--onPrimary);
    width:100%;
    overflow: hidden;
    font-weight: 700;

`
const TableHeaderItem = styled.td`
    width: 50%;
    height: 3rem;
    padding: 1rem;
    box-sizing: border-box;
    margin: 0;

`
const TableItem = styled.td`
    width: 50%;
    height: 5rem;
    padding: 1rem;
    box-sizing: border-box;
    margin: 0;
`
const Header = styled.div`
    width: 100% ;
    font-weight: 600;
    background-color: var(--onSecondary);
    color: var(--primary);
    font-weight: 400;

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
const TypeDisplay = styled.div`
    display: flex;
    align-items: center;
    & span{
        font-weight: 700;
        margin-left: 1rem
    }
`