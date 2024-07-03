import { LegacyRef } from "react"
import styled from "styled-components"

export default function DropdownMenu({items, title, selectedItem, setSelected, dropdownRef} : {
    items: Array<{
        name: string,
        value: string,
    }>,
    dropdownRef: LegacyRef<HTMLDivElement> | undefined
    title?: string,
    selectedItem: string,
    setSelected: (value: string) => void
})
{

    return(
        <Dropdown ref={dropdownRef} className="dropdown">
            {title && 
            <Title className="dropdown">{title}</Title>
            }
            <ItemList >
                {items.map(item=>{
                    return(
                        <Item className="dropdown" key={item.value}>
                            <SelectionButton className={`dropdown ${item.value === selectedItem && 'selected'}`} onClick={()=> setSelected(item.value)}/>
                            <span className="dropdown">{item.name}</span>
                            </Item>
                    )
                })}
            </ItemList>
        </Dropdown>
    )
}

const Dropdown = styled.div`
    position: absolute;
    z-index: 12;
    left: -50%;
    top: 100%;
    width: 15rem;
    text-align: center;
    padding: 1rem 0;
    background-color: var(--background2);
    border-radius: 0.3rem;
    box-shadow: 0 0 1.5rem #000a001f;
    color: var(--onPrimary);

`
const ItemList = styled.ul`
    list-style: none;
    margin: 0;

    padding: 0;
`
const Item = styled.li`
    display: flex;
    align-items: center;
    font-weight: 700;
    padding: 1rem;
    font-size: 1.1rem;

`
const SelectionButton = styled.div`
    border: 0.2rem solid var(--tertiary);
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 1rem;
    position: relative;
    padding: 0;
    &.selected::after{
        content: "";
        width: 1rem;
        height: 1rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        border-radius: 50%;
        background-color: var(--onPrimary);
    }
    cursor: pointer;
`
const Title = styled.h4`
    font-size: 1.3rem;
`