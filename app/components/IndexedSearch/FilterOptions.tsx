import styled from "styled-components"
import SortBy from "./SortBy"
import { capitalize } from "@/app/utils/text-transform"
import { ElementsCount } from "@/app/utils/definitions"

export default function FilterOptions({page, count, order, orderBy}: 
    {
        page: number,
        count: number,
        order: string, 
        orderBy: string
    })
{

    const firstElement = (page * 10) - 9
    const lastElement = Math.min(page * 10, count) 
    return(
        <Container>
            <Count>
            {
                count > 0 &&
            <p><strong> {firstElement}-{lastElement}</strong> of <strong>{count}</strong> results</p>
            }
            </Count>

            <Flex>
                <Option style={{width:'13rem'}}>
                <span>Order by</span>
                <SortBy
                    order={orderBy}
                    options={orderByOptions}
                    title={capitalize(orderBy)}
                    urlPropName="orderBy"
                />
                </Option>
                <Option style={{width:'15rem'}}>
                <span>Order</span>
                <SortBy
                    order={order}
                    options={orderOptions}
                    title={capitalize(order)}
                    urlPropName="order"
                />
                </Option>
            </Flex>
        </Container>
    )
}
const orderOptions = [
    {value: 'ascendant', name: "Ascendant"},
    {value: 'descendant', name: "Descendant"}
]
const orderByOptions = [
    {value: 'title', name: "Title"},
    {value: 'type', name: "Type"}
]
const Container = styled.div`
    display: flex;
    width: 100%;
    padding: 0.5rem 1rem;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    font-size: 1.2rem;
    & strong{
        font-weight: 700;
    }
`
const Count = styled.div`
    width: 100%;
`
const Option = styled.div`
display:flex;
align-items: center;
justify-content: center;
margin-right: 1.5rem;
& span{
    font-size: 1.1rem;
    min-width: fit-content;
    padding-right: 0.5rem;
}
`

const Flex = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
`