'use client'
import FeatherIcon from "feather-icons-react"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import styled from "styled-components"
import { useDebouncedCallback } from "use-debounce"

export default function PaginationComponent({count, currentPage}:{
    count: number,
    currentPage: number
}) 
{
    const pageNumbers = Math.ceil(count / 10)
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()

    const handleChangePage = useDebouncedCallback((page: number)=>
    {
        const params = new URLSearchParams(searchParams)
        if(page){
            params.set('page', page.toString())
        }else{
            params.delete('page')
        }
        replace(`${pathname}?${params.toString()}`)
        
    }, 200)


    let lOffset = currentPage - 4
    let rOffset = currentPage + 4
    if(rOffset >= pageNumbers){
        lOffset += pageNumbers - rOffset -1
    }
    if(lOffset < 0){
        rOffset += lOffset * -1
    }

    return(
        <Container>
            <List>

                {
                    currentPage > 4 &&
                    <Page 
                    onClick={()=>{handleChangePage(1)}}
                    className={`button ${currentPage <= 1 && 'disabled'}`}
                    >
                        <span>
                            <FeatherIcon icon="chevrons-left" size={15} />
                        </span>
                    </Page>
                }

                {
                currentPage > 1 &&
                <Page 
                className={` button ${currentPage <= 1 && 'disabled'} `}
                onClick={()=>{handleChangePage(currentPage -1 )}}
                >
                    <span>
                        <FeatherIcon icon="chevron-left" size={15}/>
                    </span>
                        
                </Page>

                    }



                {
                    Array(pageNumbers).fill(null).map((page, index)=>{


                        if(index > rOffset || index < lOffset) return null
                        return(
                            <Page 
                            key={index} 
                            className={`button ${currentPage === index + 1 && 'selected'}`}
                            onClick={()=>{handleChangePage(index +1 )}}
                            ><span>{index + 1}</span></Page>
                        )
                    })
                }
                {
                    currentPage < pageNumbers &&
                    <Page 
                    onClick={()=>{handleChangePage(currentPage +1 )}}
                    className={`button ${currentPage >= pageNumbers && 'disabled'}`}
                    disabled={currentPage >= pageNumbers}
                    >
                        <span>
                            <FeatherIcon icon="chevron-right" size={15} />
                        </span>
                    </Page>
                }
                {
                    currentPage < pageNumbers - 5 &&
                    <Page 
                    onClick={()=>{handleChangePage(pageNumbers)}}
                    className={`button ${currentPage >= pageNumbers && 'disabled'}`}
                    disabled={currentPage >= pageNumbers}
                    >
                        <span>
                            <FeatherIcon icon="chevrons-right" size={15} />
                        </span>
                    </Page>
                }

            </List>
        </Container>
    )
}


const Container = styled.div`
    margin: 0 auto;
    padding: 0.3rem;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--onSecondary);
    width: 80%;
`
const List = styled.ul`
    width: fit-content;
    list-style: none;
    border-radius: 0.3rem;
    overflow: hidden;
    display: flex;
    padding: 0;
    margin: 0;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`
const Page = styled.button`
    border: none;
    font-size: inherit;
    font-family: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    margin-right: 0.3rem;
    width: 3rem;
    height: 3rem;
    background-color: inherit;
    color: var(--primary);
    &:first-child{
        z-index: 3;
    }
`
