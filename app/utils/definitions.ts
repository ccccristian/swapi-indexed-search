
export type SearchResult = {
    Id: number,
    Title: string,
    Type: DataType,
    ElementID: number,
}
export type SearchInput = {
    id: number,
    type: DataType

}
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
export enum DataType{
    People = "people",
    Film = "films",
    Vehicles = "vehicles",
    Starships = "starships",
    Species = "species",
    Planets = "planets"
}

export type People = {
    birth_year: string,
    eye_color: string,
    films: Array<string>,
    gender: string,
    hair_color: string,
    height: string,
    homeworld: string,
    mass: string,
    name: string,
    skin_color: string,
    created: string,
    edited: string,
    species: Array<string>,
    starships: Array<string>,
    url: string,
    vehicles: Array<string>,
}
export type Films = {
    title: string,
    episode_id: number,
    opening_crawl: string,
    director: string,
    producer: string,
    release_date: string,
    species: Array<string>,
    starships: Array<string>,
    vehicles: Array<string>,
    characters: Array<string>,
    planets: Array<string>,
    url: string,
    created: string,
    edited: string,
}
export type Vehicles = {
    name: string,
    model: string,
    vehicle_class: string,
    manufacturer: string,
    length: string,
    cost_in_credits: string,
    crew: string,
    passengers: string,
    max_atmosphering_speed: string,
    cargo_capacity: string,
    consumables: string,
    films: Array<string>,
    pilots: Array<string>,
    url: string,
    created: string,
    edited: string,
}
export type Species = {
    name: string,
    classification: string,
    designation: string,
    average_height: string,
    average_lifespan: string,
    eye_colors: string,
    hair_colors: string,
    skin_colors: string,
    language: string,
    homeworld: string,
    people: Array<string>,
    films: Array<string>,
    url: string,
    created: string,
    edited: string,
}
export type Planets = {
    name: string,
    diameter: string,
    rotation_period: string,
    orbital_period: string,
    gravity: string,
    population: string,
    climate: string,
    terrain: string,
    surface_water: string,
    residents: Array<string>,
    films: Array<string>,
    url: string,
    created: string,
    edited: string,
}
export type Starships = {
    name: string,
    model: string,
    starship_class: string,
    manufacturer: string,
    cost_in_credits: string,
    length: string,
    crew: string,
    passengers: string,
    max_atmosphering_speed: string,
    hyperdrive_rating: string,
    MGLT: string,
    cargo_capacity: string,
    consumables: string,
    films: Array<string>,
    pilots: Array<string>,
    url: string,
    created: string,
    edited: string,
}