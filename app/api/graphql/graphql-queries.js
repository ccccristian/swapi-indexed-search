import gql from "graphql-tag";

export const SEARCH = gql`
    query searchResult($query: String!){
        search(query: $query){
            id
            type 
            title 
        }
    }
`
export const GET_ELEMENT = gql`
    query getElement($item: SearchInput){
        getElement(item: $item){
        ...PersonFields
        ...FilmFields
        ...StarshipFields
        ...VehicleFields
        ...SpeciesFields
        ...PlanetFields
        }
    }

    fragment PersonFields on Person {
        birth_year
        eye_color
        films
        gender
        hair_color
        height
        homeworld 
        mass
        name
        skin_color
        created
        edited
        species
        starships 
        url
        vehicles
    }
    fragment FilmFields on Film {
        title
        episode_id
        opening_crawl
        director
        producer
        release_date
        species
        starships
        vehicles
        characters
        planets
        url
        created
        edited
    }
    fragment StarshipFields on Starship{
        name
        model
        starship_class
        manufacturer
        cost_in_credits
        length
        crew
        passengers
        max_atmosphering_speed
        hyperdrive_rating
        MGLT
        cargo_capacity
        consumables
        films
        pilots
        url
        created
        edited
    }
    fragment VehicleFields on Vehicle{
        name
        model
        vehicle_class
        manufacturer
        length
        cost_in_credits
        crew
        passengers
        max_atmosphering_speed
        cargo_capacity
        consumables
        films
        pilots
        url
        created
        edited
    }
    fragment SpeciesFields on Species{
        name
        classification
        designation
        average_height
        average_lifespan
        eye_colors
        hair_colors
        skin_colors
        language
        homeworld
        people
        films
        url
        created
        edited
    }
    fragment PlanetFields on Planet{
        name
        diameter
        rotation_period
        orbital_period
        gravity
        population
        climate
        terrain
        surface_water
        residents
        films
        url
        created
        edited
    }
`

export const GET_PERSON = gql`
    query person($id: Int!){
        getPerson(id: $id){
            birth_year
            eye_color
            films
            gender
            hair_color
            height
            homeworld 
            mass
            name
            skin_color
            created
            edited
            species
            starships 
            url
            vehicles
        }
    }
`