import {  useEffect, useRef, useState } from "react"
import styled from "styled-components"
import DropdownMenu from "../DropdownMenu"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Svg from "../ui/Svg"
import FeatherIcon from "feather-icons-react"

export default function SortBy({order, options, title, urlPropName} : 
    {
        urlPropName: string
        order: string,
        options: Array<{value: string, name: string}>,
        title: string,
    })
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
            params.set(urlPropName, value)
        }else{
            params.delete(urlPropName)
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
                <span className="dropdown">{title}</span>
                <FeatherIcon icon="chevron-down" size={14}/>
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

const Container = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
`
const FilterButton = styled.button`
    background-color: #00000047;
    padding: 1rem;
    font-weight: 700;
    color: var(--onPrimary);
    border-radius: 0.3rem;
    font-size: 1rem;
    font-family: inherit;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    cursor: pointer;
    & span{
        margin-left: 0.5rem;
    }
`