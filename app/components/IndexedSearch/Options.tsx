import { StringifyCategory } from "@/app/utils/categories"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { capitalize } from "@/app/utils/text-transform"
import { devices } from "@/app/utils/screenSizes"

export default function Options({category} : {category: string[]})
{
    const [checkList, setChecklist] = useState<Array<{name:string, checked: boolean}>>([
        {name: 'people',    checked: category.includes('people')},
        {name: 'planets',   checked: category.includes('planets')},
        {name: 'species',   checked: category.includes('species')},
        {name: 'vehicles',  checked: category.includes('vehicles')},
        {name: 'starships', checked: category.includes('starships')},
        {name: 'films',     checked: category.includes('films')},
    ]
    )

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter() 

    function updateOptions()
    {
        const params = new URLSearchParams(searchParams)

        const stringified = StringifyCategory(checkList.flatMap(e =>
            { 
                if(!e.checked) return []
                return e.name
            }) )
        params.set('page', '1')
        if(stringified){
            params.set('category', stringified)
        }else{
            params.delete('category')
        }
        replace(`${pathname}?${params.toString()}`)
    }
    useEffect(()=>{
        function updateCheckList()
        {
            const newCheckList = checkList.map((e)=>{
                return {name: e.name, checked: category.includes(e.name)}
            })
            setChecklist(newCheckList)
        }
        updateCheckList()
    }, [category])

    function handleChange(name:string, checked: boolean)
    {
        setChecklist(checkList.map(e =>{
            if(e.name !== name) return e
            return {name, checked}
        }))
    }

    return(
        <Container>
            <SectionTitle>Categories</SectionTitle>
            <List>
                {
                    checkList.map(({name, checked}, index)=>{
                        return(
                            <Option 
                            key={index} 
                            name={name} 
                            checked={checked} 
                            handleChange={(isChecked: boolean)=>{ handleChange(name, isChecked)}} 
                            />
                        )
                    })
                }
            </List>
            <Button className="button" onClick={updateOptions}>
                <span>Apply</span>
            </Button>
        </Container>
    )
}

function Option({name, checked, handleChange} : 
    {
        name:string,
        checked: boolean,
        handleChange: (checked: boolean)=> void
    }){
    return(
        <Li>
        <OptionLabel>
                <input type="checkbox" checked={checked} onChange={(e)=> handleChange(e.target.checked)}/>
                <Checkmark className="checkmark"/>
                <span>{capitalize(name)}</span>
        </OptionLabel>
        </Li>
    )
}
const Container = styled.aside`
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    width: 95%;
    align-items: center;
    justify-content: center;
    @media ${devices.tablet}{
            width: inherit;
            padding-left: 3rem;
        }
`
const List = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    @media ${devices.tablet}{
        flex-direction: column;
    }
    @media ${devices.mobileL}{
        width: 70%;

    }
    @media ${devices.tablet}{
        width: 100%;

    }
`
const SectionTitle = styled.h5`
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
`
const Checkmark = styled.div`
    border: 0.1rem solid var(--onPrimary);
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
    margin-right: 0.5rem;
    &::after{
        content: "";
        position: absolute;
        top: 0.2rem;
        left: 0.5rem;
        scale: 0;
        transition: scale .1s;
    }
`
const Li = styled.li`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media ${devices.tablet}{
            width: 100%;
        }
`
const OptionLabel = styled.label`
    cursor: pointer;
    display: flex;
    width: 10rem;
    margin-bottom: 1rem;
    user-select: none;
    align-items: center;
    font-size: 1.3rem;
    font-weight: 500;
    & input{
        display: none;
    }
    & input:checked ~ .checkmark{
        background-color: var(--light);
    }
    & input:checked ~ .checkmark::after{

        border-width: 0;
        border-right-width: 0.2rem;
        border-bottom-width: 0.2rem;
        transform: rotate(45deg);
        border-color: var(--primary);
        border-style: solid;
        width: 0.3rem;
        height: 0.8rem;
        scale: 1;

    }

`

export const Button = styled.button`
    background-color: var(--onSecondary);
    padding: 1rem;
    border: none;
    color: var(--primary);
    font-size: 1rem;
    font-family: inherit;
    border-radius: 0.3rem;
    display: flex;
    cursor: pointer;
`