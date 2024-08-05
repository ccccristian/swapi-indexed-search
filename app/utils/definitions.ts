

// What query to indexed database returns
export type SearchResult = {
    Id: number,
    Title: string,
    Type: DataType,
    ElementID: number,
}

//Graphql input to get elements without specifying the type
export type SearchInput = {
    id: number,
    type: DataType
}

//Search params that we get from the server
export type InitialSearchParams = {
    query?: string,
    page?: string,
    category?: string,
    order?: string,
    orderBy?: string
  } | undefined

//InitialSearchParams converted to safe data
export type SearchParams = {
    query: string,
    page: number,
    category: Array<DataType>,
    order: Order,
    orderBy: OrderBy
}

export enum Order {
    ASCENDANT = 'ascendant',
    DESCENDANT = 'descendant',
}
export enum OrderBy {
    TITLE = 'title',
    TYPE = 'type',
}

export type ResultList = Array<SearchResult> | []

//Elements count to pagination and display in menu.
export type ElementsCount = {
    count?: number,
    currentCount?: number,
    peopleCount?: number,
    speciesCount?: number,
    planetsCount?: number,
    filmsCount?: number,
    vehiclesCount?: number,
    starshipsCount?:number,
}

//Element types of sql index
export enum DataType{
    People = "people",
    Film = "films",
    Vehicles = "vehicles",
    Starships = "starships",
    Species = "species",
    Planets = "planets"
}
