export type TypeofCharListForDashboard  =  {
    info : {
        count: number,
        pages: number,
        next: string | null,
        prev: string | null,
        currentPage : number
    } ,  
    characters :Array<TypeCharacters> 
}


export type TypeCharacters = {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: {
        name: string,
        url: string
    },
    location: {
        name: string
        url: string
    },
    image: string,
    episode: string[],
    url: string,
    created: string,
    locationMeta : TypeLocationMeta | null,
    episodeMeta : TypeEpisodMetaForCharacters[] | null
}

export type TypeLocations  = {
    id: number,
    name: string,
    type: string,
    dimension: string,
    residents: string[],
    url: string,
    created: string,
}

export type TypeLocationMeta = {
    name: string,
    type: string,
    dimension: string,   
    totalResidents : number
}

export type TypeEpisod  = {
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: string[],
    url: string,
    created: string,
}


export type TypeEpisodMetaForCharacters = {
  name: string,
  air_date: string,
  episode: string,
}
