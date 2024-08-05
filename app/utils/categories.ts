import { DataType } from "./definitions"

//Converts string to DataType
export const getDataType : (param:string)=> DataType | null = (param: string)=>{
    switch(param){
      case 'people':
        return DataType.People
      case 'vehicles':
        return DataType.Vehicles
      case 'films':
        return DataType.Film
      case 'species':
        return DataType.Species
      case 'starships':
        return DataType.Starships
      case 'planets':
        return DataType.Planets
  
      default:
        return null
  
    }
  }
//Converts DataType to string 
  export const getCategory : (param: DataType | null) => string |null = (param: DataType | null)=>{
    switch(param){
        case DataType.People:
          return 'people'
        case DataType.Vehicles:
          return 'vehicles'
        case DataType.Film:
          return 'films'
        case DataType.Species:
          return'species'
        case DataType.Starships:
          return 'starships'
        case DataType.Planets:
          return 'planets'
        default:
          return null
      }
  }

// converts a category array to string (used in url params)
  export function StringifyCategory(categories: Array<string>)
  {
    let categoriesString = ''

    for(let category of categories){
      let dataType = getDataType(category.toLowerCase())
      if(!dataType) continue
      
      if(categoriesString.length > 0){
        categoriesString += ' '
      }
      categoriesString += dataType
    
    }
    return categoriesString
  }

// converts a string to a category array
  export function ParseCategory(categories: string)
  {
    //Separating string by spaces
    const categoriesArray = categories.split(' ')

    //Gets only the compatible ones and converts items to DataType
    //Avoid bugs, invalid url params and make structure easier
    const filtered = categoriesArray.flatMap(c => 
      {
        const dataType = getDataType(c) // If is not valid, returns null
        if(!dataType) return [] // To exclude it from the flatMap

        return dataType
      })

    return filtered
  }