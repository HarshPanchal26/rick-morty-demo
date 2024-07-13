/**
 * Services related to character listing.
 */

import ApiService from "./ApiService";
import { TypeofCharListForDashboard } from "../utils/type";
import { ServiceForCustomize } from "./ServiceForCustomize";

export class ServicesForCharactersList{

    private static ObjForCharactersList : Array<TypeofCharListForDashboard> = [];

    /**
     *  Fetch character list if can not find in local storage
     * 
     * @param page page number for pagination of api calls
     * @returns returns object with character's array and other meta data related to pagination.
     */
    public static async getCharactersForDashboard(page: number = 1): Promise<TypeofCharListForDashboard>{        
        const charactersFromLocal : TypeofCharListForDashboard | null  = this.ObjForCharactersList.filter(item => item.info.currentPage == page)[0] || null; 
        if(charactersFromLocal){
            return Promise.resolve(charactersFromLocal);
        }else{
            return await this.fetchCharacters(page);
        }
    }
    
    /**
     * Fetch character list with pagination related info.
     * 
     * @param page page number for pagination of api calls
     * @returns returns object with character's array and other meta data related to pagination.
     */
    public static async fetchCharacters(page ? : number){
        try {
            const res = await ApiService.get(`https://rickandmortyapi.com/api/character?page=${page}`); 
            const customizeRes = ServiceForCustomize.customizeCharachters(res.data);
            return Promise.resolve(customizeRes);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    
    public static async fetchSearchedCharacters(search : string , page: number = 1){
        try {
            const res = await ApiService.get(`https://rickandmortyapi.com/api/character?name=${search}&page=${page}`); 
            const customizeRes = ServiceForCustomize.customizeCharachters(res.data);
            return Promise.resolve(customizeRes);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public static async filterChracters(filterParms : string){
        try {
            const res = await ApiService.get(`https://rickandmortyapi.com/api/character?${filterParms}`); 
            const customizeRes = ServiceForCustomize.customizeCharachters(res.data);
            return Promise.resolve(customizeRes);
        } catch (error) {
            return Promise.reject(error);
        }
    }

}   