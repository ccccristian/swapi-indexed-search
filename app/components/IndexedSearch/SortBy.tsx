import FeatherIcon from "feather-icons-react"
import { MouseEvent, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import DropdownMenu from "../DropdownMenu"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Svg from "../ui/Svg"

export default function SortBy({order} : {order: string})
{
    const [show, setShow] = useState(false)

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()

    const dropdownRef = useRef(null)
    const handleChangeOption = (value: string)=>
    {
        const params = new URLSearchParams(searchParams)
        params.set('page', '1');
        if(value){
            params.set('order', value)
        }else{
            params.delete('order')
        }
        replace(`${pathname}?${params.toString()}`)
    }
    useEffect(()=>{
        const handleClick = (e: Event)=>{
            const {target} = e
            if(target instanceof HTMLElement && show && !target?.className.includes('dropdown')){
                setShow(false)
            }
        }
        window.addEventListener('click', handleClick)
        return ()=> window.removeEventListener('click', handleClick)
    }, [show])
    return(
        <Container style={{position: 'relative'}} className="dropdown">
            <FilterButton onClick={()=>setShow(!show)}  className="dropdown">
                <Svg name="sort"
                />
                <span className="dropdown">Order</span>
            </FilterButton>
            {
                show &&
                <DropdownMenu
                dropdownRef={dropdownRef}
                items={options} 
                setSelected={(value:string)=>handleChangeOption(value)} 
                selectedItem={order}/>
            }
        </Container>
    )
}
const options = [
    {value: 'ascendant', name: "Ascendant"},
    {value: 'descendant', name: "Descendant"}
]
const Container = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    margin: .3rem;
    height: 100%;
`
const FilterButton = styled.button`
    background-color:transparent;
    padding: 1rem;
    border: none;
    font-weight: 700;
    color: var(--onPrimary);
    border-radius: 0.3rem;
    font-size: 1rem;
    font-family: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`