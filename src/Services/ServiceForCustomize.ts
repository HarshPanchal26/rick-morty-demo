/**
 * Service class for customize(as per our comfort)  charcter's data provided by api.
 */

import { TypeCharacters, TypeofCharListForDashboard } from "../utils/type";

export class ServiceForCustomize{

    public static customizeCharachters(ObjForCharacters : {info : any , results : Array<unknown>}) : TypeofCharListForDashboard{
        
        const characters : Array<TypeCharacters> = ObjForCharacters.results.map((item : any)=>{
            return {
                id: item.id,
                name: item.name,
                status: item.status,
                species: item.species,
                type: item.type,
                gender: item.gender,
                origin: {
                    name: item.origin.name,
                    url: item.origin.url
                },
                location: {
                    name: item.location.name,
                    url: item.location.url
                },
                image: item.image,
                episode: [...item.episode],
                url: item.url,
                locationMeta : null,
                episodeMeta : null,
                created: item.created,
            }
        }) 

        return {
            info : ObjForCharacters.info,
            characters
        }
    }

    public static customizeCharachterProfile(char : any) : TypeCharacters{
            return {
                id: char.id,
                name: char.name,
                status: char.status,
                species: char.species,
                type: char.type,
                gender: char.gender,
                origin: {
                    name: char.origin.name,
                    url: char.origin.url
                },
                location: {
                    name: char.location.name,
                    url: char.location.url
                },
                image: char.image,
                episode: [...char.episode],
                url: char.url,
                created: char.created,
                locationMeta : null,
                episodeMeta : null
            }
    }
}