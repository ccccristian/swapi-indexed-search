import {  useEffect, useState } from "react"
import styled from "styled-components"
import DropdownMenu from "../DropdownMenu"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import FeatherIcon from "feather-icons-react"

export default function SortBy({id, order, options, title, urlPropName} : 
    {
        id: string,
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
            if(target instanceof HTMLElement && show && !target?.className.includes(id)){
                setShow(false)
            }
        }
        window.addEventListener('click', handleClick)
        return ()=> window.removeEventListener('click', handleClick)
    }, [show])
    return(
        <Container className={id}>
            <FilterButton onClick={()=>setShow(!show)} className={id}>
                <span className={id}>{title}</span>
                <FeatherIcon icon="chevron-down" size={14}/>
            </FilterButton>
            {
                show &&
                <DropdownMenu
                id={id}
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