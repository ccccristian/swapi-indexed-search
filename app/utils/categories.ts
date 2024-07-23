import { DataType } from "./definitions"

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

  export function ParseCategory(categories: string)
  {
    const categoriesArray = categories.split(' ')

    const filtered = categoriesArray.flatMap(c => 
      {
        const dataType = getDataType(c)
        if(!dataType) return []
        return dataType
      })

    return filtered
  }