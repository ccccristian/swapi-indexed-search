import { DataType } from "./definitions"

export const getDataType : (param:string)=> DataType | null = (param: string)=>{
    switch(param){
      case 'people':
        return DataType.PERSON
      case 'vehicles':
        return DataType.VEHICLE
      case 'films':
        return DataType.FILM
      case 'species':
        return DataType.SPECIES
      case 'starships':
        return DataType.STARSHIP
      case 'planets':
        return DataType.PLANET
  
      default:
        return null
  
    }
  }

  export const getCategory : (param: DataType) => string |null = (param: DataType)=>{
    switch(param){
        case DataType.PERSON:
          return 'people'
        case DataType.VEHICLE:
          return 'vehicles'
        case DataType.FILM:
          return 'films'
        case DataType.SPECIES:
          return'species'
        case DataType.STARSHIP:
          return 'starships'
        case DataType.PLANET:
          return 'planets'
        default:
          return null
      }
  }