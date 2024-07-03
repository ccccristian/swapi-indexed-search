import { deleteLowLines } from "@/app/utils/text-transform"
import styled from "styled-components"

export default function Values({value} : {value : string | Array<string>})
{
    return(
        <Td>
            {
                typeof value !== 'object' ?
                <span >{value}</span>
                : <p>{
                    value.map((item, index)=>{
                        return(
                            <p key={index}>{deleteLowLines(item)}</p>
                        )
                    })
                    }</p>
            }
        </Td>
    )
}

const Td = styled.td`
    outline: none;
    border: none;
    margin: 0;
`