import FeatherIcon from 'feather-icons-react';
import { useContext } from 'react';
import { ScrollMenu, VisibilityContext, publicApiType } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import styled from 'styled-components';

export default function HorizontalScroll(
    {items, onClick, currentCategory}:
    {
        items: Array<{name: string, value: string, count?: number}>,
        onClick: (name: string) => void,
        currentCategory?: string
    }
) {
  return (
    <MainContainer>
        <ScrollMenu scrollContainerClassName='categorySelectorContainer' LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {items.map(({name, value, count}, index) => (
            <CategoryItem
            name={name}
            key={index}
            count={count}
            currentCategory={currentCategory}
            handleSelectCategory={onClick}
            value={value}
            />
        ))}
        </ScrollMenu>
    </MainContainer>
  );
}

const LeftArrow = () => {
  const visibility = useContext<publicApiType>(VisibilityContext)
  const isFirstItemVisible = visibility.useIsVisible('first', true);
  return (
    <InteractionButton
      disabled={isFirstItemVisible}
      onClick={()=>visibility.scrollPrev()}
      style={
        {
            left:0,
            background: 'linear-gradient(to right, var(--onSecondary) 60%, transparent)'
        }}
      className={`interaction ${isFirstItemVisible && 'hidden'}`}
    >
    <FeatherIcon icon="chevron-left"/>
    </InteractionButton>
  );
};

const RightArrow = () => {
  const visibility = useContext<publicApiType>(VisibilityContext);
  const isLastItemVisible = visibility.useIsVisible('last', false);
  return (
    <InteractionButton
      disabled={isLastItemVisible}
      onClick={()=> visibility.scrollNext()}
      style={
        {
            right:0,
            background: 'linear-gradient(to left,  var(--onSecondary) 60%,  transparent 100%'
        }}
      className={`${isLastItemVisible && 'hidden'}`}

    >
         <FeatherIcon icon="chevron-right"/>
    </InteractionButton>
  );
};

function CategoryItem({name, currentCategory, handleSelectCategory, count, value}:{
    name: string,
    currentCategory?: string,
    value: string,
    count?: number,
    handleSelectCategory: (name: string) => void
})
{
    return(
        <Item 
        className={`${currentCategory === value && "selected" } ${!currentCategory && !value && 'selected'} `}
        onClick={()=>handleSelectCategory(value)}>
            {name} ({count ?? 0})
            </Item>
    )
}

const MainContainer = styled.div`
  display: block;
  width: 100%;
  flex-grow: 1;
  position: relative;
  margin-top: 1rem;

  & .categorySelectorContainer{
    display: flex;
    justify-content: start;
    overflow-x: auto;
    max-width: 100%;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`

const Item = styled.div`
    padding: 1rem;
    width: 10rem;
    text-align: center;
    user-select: none;
    cursor: pointer;
    box-sizing: border-box;
    position: relative;
    &::after{
        content: "";
        position: absolute;
        box-sizing: border-box;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
        transition: border .2s;
        border-bottom: 0.3rem solid transparent;
    }
    &:hover::after{
        border-bottom-color:  var(--lightHover);
    }
    &.selected::after{
      border-bottom-color:  var(--light);
    }

`

const InteractionButton = styled.button`
    position: absolute;
    top: 0;
    height: 100%;
    width: 5rem;
    color: #fff;
    border: none;
    z-index: 1;
    cursor: pointer;
    &.hidden{
      display: none;
    }
`