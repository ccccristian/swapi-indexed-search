import styled from "styled-components"
import Svg from "./Svg"

export default function Switch(
    {active, setActive} : 
    {active: boolean, setActive: (act: boolean)=> void
    }){
        return(
            <Container className="container">
                <Checkbox type="checkbox" checked={active} className={`${active && 'active'}`} onChange={e => setActive(e.target.checked)}/>
                <Checkmark className="checkmark">
                  <Svg name={active ? '3' : '4'} width={30} height={30}/>

                </Checkmark>
            </Container>
        )
}


const Container = styled.label`
    display: block;
  position: relative;
  cursor: pointer;
  height: 3rem;
  width: 6rem;
  border-radius: 2rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: var(--background2);
  & input:checked ~ .checkmark{
    left: 55%;
    animation: rotate-right .6s;
  }
  & input{
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

`
const Checkmark = styled.span`
    position: absolute;
    height: 2.5rem;
    width: 2.5rem;
    top: 0.25rem;
    left: 5%;
    border-radius: 50%;
    transition: left .6s;
    animation: rotate-left .6s;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Checkbox = styled.input`
`