export const resolvers = {
    Query: {
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
        }
    }

}