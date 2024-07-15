import {  ElementsCount } from "@/app/utils/definitions"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import HorizontalScroll from "../ui/HorizontalScroll"


export default function CategorySelector({category, elementsCount} : {category?: string, elementsCount: ElementsCount})
{
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()
    const categoryItems= [
        {
            name: "All",
            value: "",
            count: elementsCount?.count
        },
        {    
            name: "People" ,
            value: "people",
            count: elementsCount?.peopleCount
        },
        {
            name: "Planets" ,
            value: "planets",
            count: elementsCount?.planetsCount
        },
        {
            name: "Species" ,
            value: "species",
            count: elementsCount?.speciesCount
        },
        {
            name: "Vehicles" ,
            value: "vehicles",
            count: elementsCount?.vehiclesCount
        },
        {
            name: "Starships" ,
            value: "starships",
            count: elementsCount?.starshipsCount
        },
        {
            name: "Films" ,
            value: "films",
            count: elementsCount?.filmsCount
        }
    ]
    function handleSelectCateogry(category: string)
    {
        const params = new URLSearchParams(searchParams)
        params.set('page', '1');
        if(category){
            params.set('category', category)
        }else{
            params.delete('category')
        }
        replace(`${pathname}?${params.toString()}`)
    }

    return(
        <div>
            <HorizontalScroll
            currentCategory={category}
                items={categoryItems}
                onClick={handleSelectCateogry}
            />
           
        </div>

    )
}

