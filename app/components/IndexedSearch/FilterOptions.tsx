import styled from "styled-components"
import Dropdown from "../ui/Dropdown"
import { capitalize } from "@/app/utils/text-transform"
import Loading from "../Loading"

export default function FilterOptions({page, loading, count, order, orderBy}: 
    {
        page: number,
        count: number,
        order: string, 
        orderBy: string
        loading: boolean
    })
{

    const firstElement = (page * 10) - 9
    const lastElement = Math.min(page * 10, count) 
    return(
        <Container>

                <Loading loading={loading}/>
            <Count>
            {
                count > 0 && !loading &&
                <p><strong> {firstElement}-{lastElement}</strong> of <strong>{count}</strong> results</p>
            }
            </Count>

            <Flex>

                <Option style={{width:'13rem', marginRight: '1.5rem'}}>
                <span>Order by</span>
                <Dropdown
                    id="obdrop"
                    order={orderBy}
                    options={orderByOptions}
                    title={capitalize(orderBy)}
                    urlPropName="orderBy"
                />
                </Option>
                <Option style={{width:'15rem'}}>
                <span>Order</span>
                <Dropdown
                    id="odrop"
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
    padding: 1rem 0;
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