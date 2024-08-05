import {  ElementsCount } from "@/app/utils/definitions"
import HorizontalScroll from "../ui/HorizontalScroll"


export default function CategorySelector({category, elementsCount, handleChangeParam} : 
    {
        category:string, 
        elementsCount: ElementsCount
        handleChangeParam: (param: string, value?: string) => void
    }
)
{

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
    const handleSelectCateogry = (category: string) => handleChangeParam('category', category)

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

