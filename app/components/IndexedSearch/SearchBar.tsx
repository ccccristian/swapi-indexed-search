'use client'
import React, { LegacyRef, useRef, useState } from "react";
import styled from "styled-components";
import FeatherIcon from "feather-icons-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar()
{

    const [inFocus, setInFocus] = useState(false)
    const inputRef = useRef<HTMLInputElement>()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter() 

    function handleClear(){
        if(inputRef.current){
            inputRef.current.value = ""
            handleSearch('')
        }
    }
    const handleSearch = useDebouncedCallback((term: string  | undefined)=>
    {
        const params = new URLSearchParams(searchParams)
        params.set('page', '1');
        if(term){
            params.set('query', term)
        }else{
            params.delete('query')
        }
        replace(`${pathname}?${params.toString()}`)
    }, 200)
    return(
        <SearchBarContainer className={`border-anim ${inFocus && 'focus'}`}>
                <SearchIcon>
                <FeatherIcon icon="search" size={20} className="text-primary"/>
            </SearchIcon>
            <InputGroup >
                <InputBar  
                ref={inputRef as LegacyRef<HTMLInputElement> | undefined} 
                type="text" 
                defaultValue={searchParams.get('query')?.toString()} 
                onChange={e => handleSearch(e.target.value)} 
                placeholder="Search..."
                onFocus={()=>setInFocus(true)}
                onBlur={()=>setInFocus(false)}
                />
                {
                inputRef.current && inputRef.current.value.length > 0 &&
                <Clear onClick={handleClear}>
                    <FeatherIcon icon="x" size={15}/>
                </Clear>
                }

            </InputGroup>
        </SearchBarContainer>
    )
}


const SearchBarContainer = styled.div`
    position: relative;
    background-color: var(--background2);
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.3rem;
    box-sizing: border-box;
    margin-bottom: 1rem;
    border: 0.2rem solid transparent;
    padding: 0;

`
const Clear = styled.div`
    cursor: pointer;
    position: absolute;
    color: var(--onPrimary);
    top: 50%;
    right: 1rem;
    transform: translateY(-50%)

`
const InputGroup = styled.div`
    position: relative;
    width: 100%;
    padding: 0;
    margin: 0;
`
const InputBar = styled.input`
    width: 100%;
    padding: 1rem;
    font-size: 1.1rem;
    background-color: transparent;
    color: var(--onPrimary);
    border: none;
    font-family: inherit;
    font-weight: 500;
    &:focus{
        outline: none;
    }
`

const SearchIcon = styled.div`
    height: 100%;
    width: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`