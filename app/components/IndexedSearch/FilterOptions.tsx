import styled from "styled-components"
import Dropdown from "../ui/Dropdown"
import { capitalize } from "@/app/utils/text-transform"
import Loading from "../Loading"
import { devices } from "@/app/utils/screenSizes"

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
            <Count>
            <Loading loading={loading}/>
            {
                count > 0 && !loading &&
                <p><strong> {firstElement}-{lastElement}</strong> of <strong>{count}</strong> results</p>
            }
            </Count>

            <Flex>
                <Option className="margin">
                <span className="title">Order by</span>
                <Dropdown
                    id="obdrop"
                    order={orderBy}
                    options={orderByOptions}
                    title={capitalize(orderBy)}
                    urlPropName="orderBy"
                />
                </Option>
                <Option>
                <span className="title">Order</span>
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
    flex-direction: column;
    width: 100%;
    padding: 1rem 1rem;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    font-size: 1.2rem;
    & strong{
        font-weight: 700;
    }
    @media ${devices.tablet}{
        flex-direction: row;
        padding-left: 3rem;
        padding-right: 0;
    width: 60%;

    }
`

const Count = styled.div`
    width: 100%;
    height: 3rem;
    @media ${devices.tablet}{
        height: inherit;
    }
`
const Option = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    text-align: end;
    &.margin{
        margin-right: 1rem;
    }
    & .title{
        font-size: 1.1rem;
        min-width: fit-content;
        padding-bottom: 0.8rem;
    }
    @media ${devices.tablet}{
        flex-direction: row;
        & .title{
            padding-bottom: 0;
            padding-right: 0.8rem;
        }
    }
`
// const Option = styled.div`
//     & span{
//         font-size: 1.1rem;
//         min-width: fit-content;
//         padding-right: 0.8rem;
//         width: 7rem;
//     }
// `
const Flex = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`



// const Flex = styled.div`
//     display:flex;
//     align-items: center;
//     justify-content: center;

// `