import { gql } from "graphql-tag";

export const typeDefs = gql`

type Query{
    getPerson(id: Int!): Person
    getFilm(id: Int!): Film
    getVehicle(id: Int!): Vehicle
    getSpecies(id: Int!): Species
    getPlanet(id: Int!): Planet
    Root: Root
}
type Root{
    films: String!
    people: String!
    planets: String!
    species: String!
    starships: String!
    vehicles: String!
}

type Person{
    birth_year: String!
    eye_color: String!
    films: [String]!
    gender: String!
    hair_color: String!
    height: String!
    homeworld: String!
    mass: String!
    name: String!
    skin_color: String!
    created: String!
    edited: String!
    species: [String]!
    starships: [String]!
    url: String!
    vehicles: [String]!
}
type Film{
    title: String!
    episode_id: Int!
    opening_crawl: String!
    director: String!
    producer: String!
    release_date: String!
    species: [String]!
    starships: [String]!
    vehicles: [String]!
    characters: [String]!
    planets: [String]!
    url: String!
    created: String!
    edited: String!
}
type Vehicle{
    name: String!
    model: String!
    vehicle_class: String!
    manufacturer: String!
    length: String!
    cost_in_credits: String!
    crew: String!
    passengers: String!
    max_atmosphering_speed: String!
    cargo_capacity: String!
    consumables: String!
    films: [String]!
    pilots: [String]!
    url: String!
    created: String!
    edited: String!
}
type Species{
    name: String!
    classification: String!
    designation: String!
    average_height: String!
    average_lifespan: String!
    eye_colors: String!
    hair_colors: String!
    skin_colors: String!
    language: String!
    homeworld: String!
    people: [String]!
    films: [String]!
    url: String!
    created: String!
    edited: String!
}
type Planet{
    name: String!
    diameter: String!
    rotation_period: String!
    orbital_period: String!
    gravity: String!
    population: String!
    climate: String!
    terrain: String!
    surface_water: String!
    residents: [String]!
    films: [String]!
    url: String!
    created: String!
    edited: String!
}
`
