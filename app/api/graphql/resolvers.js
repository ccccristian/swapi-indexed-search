export const resolvers = {
    Query: {
        search: async (root, args)=>{
            const query = args.query.toLowerCase()
            const response = await fetch(`https://swapi.dev/api/people/?search=${query}`)
            if(!response.ok) return []
            const json = await response.json()

            const results = json.results.map(person =>{
                //Get id from url
                const url = person.url
                const id = parseInt(url.match(/\/people\/(\d+)/)[1])
                return(
                    {
                        id,
                        title: person.name,
                        type: 'PERSON'
                    })
                })
            return results
        },
        getElement: async (root, args) => {
            if(!args.item) return null
            const parsedType = getLinkName(args.item.type)
            const response = await fetch(`https://swapi.dev/api/${parsedType}/${args.item.id}/`)
            if(!response.ok) return null

            const json = await response.json()
            return json
        },
        getPerson: async (root, args)=>{
            const response = await fetch(`https://swapi.dev/api/people/${args.id}/`)
            if(!response.ok) return null

            const json = await response.json()
            return json
        },
        getFilm: async (root, args)=>{
            const response = await fetch(`https://swapi.dev/api/films/${args.id}/`)
            if(!response.ok) return null

            const json = await response.json()
            return json
        },
        getVehicle: async (root, args)=>{
            const response = await fetch(`https://swapi.dev/api/vehicles/${args.id}/`)
            if(!response.ok) return null

            const json = await response.json()
            return json
        },
        getSpecies: async (root, args)=>{
            const response = await fetch(`https://swapi.dev/api/species/${args.id}/`)
            if(!response.ok) return null

            const json = await response.json()
            return json
        },
        getPlanet: async (root, args)=>{
            const response = await fetch(`https://swapi.dev/api/planets/${args.id}/`)
            if(!response.ok) return null

            const json = await response.json()
            return json
        },
        Root : async ()=>{
            const response = await fetch(`https://swapi.dev/api/`)
            if(!response.ok) return null

            const json = await response.json()
            return json
        },

    },
    Person: {
        __isTypeOf: (obj)=> obj.eye_color !== undefined
    },
    Film: {
        __isTypeOf: (obj)=> obj.episode_id !== undefined
    },
    Vehicle: {
        __isTypeOf: (obj)=> obj.vehicle_class !== undefined
    },
    Planet: {
        __isTypeOf: (obj)=> obj.orbital_period !== undefined
    },
    Starship: {
        __isTypeOf: (obj)=> obj.hyperdrive_rating !== undefined
    },
    Species: {
        __isTypeOf: (obj)=> obj.average_lifespan !== undefined
    },

}

function getLinkName(type){
    switch (type){
        case "PERSON":
            return 'people'
        case "VEHICLE":
            return 'vehicles'
        case "FILM":
            return 'films'
        case "STARSHIP":
            return 'starships'
        case "SPECIES":
            return 'species'
        case "PLANET":
            return 'planets'
        default:
            return 'people'
    }
}