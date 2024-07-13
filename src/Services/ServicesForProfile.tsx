import ApiService from "./ApiService";
import { TypeCharacters, TypeEpisodMetaForCharacters, TypeLocationMeta } from "../utils/type";
import { ServiceForCustomize } from "./ServiceForCustomize";

export class ServicesForProfile {

    private static StoreForProfiles: Array<TypeCharacters> | null = null;

    public static async getProfile(charId: number): Promise<TypeCharacters> {
        if (this.StoreForProfiles) {
            const charactersFromLocal: TypeCharacters | null =
                this.StoreForProfiles.filter(item => item.id == charId)[0] || null;
            if (charactersFromLocal) {
                return Promise.resolve(charactersFromLocal);
            } else {
                return await this.fetchProfile(charId)
            }
        } else {
            return await this.fetchProfile(charId)
        }
    }

    public static async fetchProfile(charId: number): Promise<TypeCharacters> {
        try {
            const res = await ApiService.get(`https://rickandmortyapi.com/api/character/${charId}`);
            const customizeRes = ServiceForCustomize.customizeCharachterProfile(res.data);
            return Promise.resolve(customizeRes);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public static async fetchLocation(locationStr: string, charId: number): Promise<TypeLocationMeta> {
        try {
            const res = await ApiService.get(locationStr);
            const customizeRes: TypeLocationMeta = {
                name: res.data.name,
                dimension: res.data.name,
                totalResidents: res.data.residents.length,
                type: res.data.type
            }
            let newStoreForProfiles: Array<TypeCharacters> | null = null
            if (this.StoreForProfiles)
                newStoreForProfiles = this.StoreForProfiles.map((item) => {
                    if (charId == item.id) {
                        const updatedData: TypeCharacters = { ...item, locationMeta: customizeRes };
                        return updatedData
                    } else {
                        return item
                    }
                })
            this.StoreForProfiles = newStoreForProfiles;
            return Promise.resolve(customizeRes);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public static async fetchEpisodes(episodes: Array<string>, charId: number): Promise<TypeEpisodMetaForCharacters[]> {
        const episodeDataForChar: Array<TypeEpisodMetaForCharacters> = []
        try {
            for (let i = 0; i < episodes.length; i++) {
                const episodeData = await ApiService.get(episodes[i]);
                episodeDataForChar.push({
                    name: episodeData.data.name,
                    air_date: episodeData.data.air_date,
                    episode: episodeData.data.episode,
                })
            }
            console.log("Fetched Episodes", charId, episodeDataForChar)
            let newStoreForProfiles: Array<TypeCharacters> | null = null
            if (this.StoreForProfiles)
                newStoreForProfiles = this.StoreForProfiles.map((item) => {
                    if (charId == item.id) {
                        const updatedData: TypeCharacters = { ...item, episodeMeta: [...episodeDataForChar] };
                        return updatedData
                    } else {
                        return item
                    }
                })
            this.StoreForProfiles = newStoreForProfiles;
            return Promise.resolve(episodeDataForChar);
        } catch (error) {
            return Promise.reject(error);
        }
    }



}