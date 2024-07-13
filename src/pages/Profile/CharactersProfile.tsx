/**
 * Component for Charcter profiles.
 */

import Style from './profile.module.css'
import { useEffect, useState } from 'react'
import { NavLink, useParams , useNavigate  } from 'react-router-dom';
import { ServicesForProfile } from '../../Services/ServicesForProfile';
import { TypeCharacters } from '../../utils/type';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


type StateTyepForCharacterObj = {
  character: TypeCharacters | null,
  isFetchingCharcter: boolean,
  isLocationBeenFetching: boolean,
  isEpisodeBeenFetching: boolean
}


export default function CharactersProfile() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [characterObj, setcharacterObj] = useState<StateTyepForCharacterObj>({ character: null, isFetchingCharcter: true, isEpisodeBeenFetching: true, isLocationBeenFetching: true });

  /**
   * Function responsible for fetching charcter data.
   * @param charId charcter unique Id.
   */
  const fetchProfile = async (charId: number) => {
    try {
      const charDetails = await ServicesForProfile.getProfile(charId);
      setcharacterObj({
        ...characterObj,
        character: charDetails,
        isFetchingCharcter: false,
      })
    } catch (error) {
      console.log("Error while fetching profile", error)
    }
  }

  /**
   * Function for fetch locations related to charcters.
   * @param location Basic location URL been provided from rick-morty api.
   */
  const fetchLocation = async (location: string) => {
    if (characterObj.character) {
      try {
        const charLocation = await ServicesForProfile.fetchLocation(location, characterObj.character.id);
        const updatedCharData: TypeCharacters = {
          ...characterObj.character,
          locationMeta: { ...charLocation }
        }
        setcharacterObj({
          ...characterObj,
          character: updatedCharData,
          isLocationBeenFetching: false
        })
      } catch (error) {
        console.log("Error while fetching loction", error)
      }
    }
  }
  /**
   * Function for fetch episodes in charcters has been part of.
   * @param episodesStr Array of episodes strings/URL been provided from rick-morty api.
   */
  const fetchEpisodes = async (episodesStr: Array<string>) => {

    try {
      if (characterObj.character) {
        const EpisodesMetaForCharacter = await ServicesForProfile.fetchEpisodes(episodesStr, characterObj.character.id);
        const updatedCharData: TypeCharacters = {
          ...characterObj.character,
          episodeMeta: [...EpisodesMetaForCharacter]
        }
        setcharacterObj({
          ...characterObj,
          character: updatedCharData,
          isEpisodeBeenFetching: false
        })
      }
    } catch (error) {
      console.log("Error while fetching episodes", error)
    }
  }

  useEffect(() => {
    if (id && !characterObj.character)
      fetchProfile(parseInt(id));

    if (characterObj.character && !characterObj.character?.locationMeta)
      fetchLocation(characterObj.character.location.url)

    if (characterObj.character && !characterObj.character.episodeMeta)
      fetchEpisodes(characterObj.character.episode)

  }, [characterObj.character])


  return (
    <div className={Style.main}>
      {/* Navigation  */}
      <div className={Style['back-button']} onClick={()=>navigate(-1)}><ArrowBackIcon/></div>
      <div className={Style['navigation']}>
        <Breadcrumbs aria-label="breadcrumb" className={Style['text-white']}>
          <NavLink to='/' >
            <p className={Style['text-white']}>Home</p>
          </NavLink>
          <Typography color="text.primary">
            <p className={Style['text-white']}>Profile</p>
          </Typography>
        </Breadcrumbs>
      </div>
      {/* Profile */}
      <div className={Style['profile-container']}>
        {/* Profile Image & Basic Details */}
        {!characterObj.isFetchingCharcter && (
          <div className={Style.profile}>

            <div className={Style['profile-img']}>
              <img className={Style['img']} src={`https://rickandmortyapi.com/api/character/avatar/${characterObj.character?.id}.jpeg`}
                alt={`Profile image of `}></img>
            </div>

            <div className={Style.info}>
              <div className={Style['text-block']}>
                <h1 className={Style['text-xx-larger']}>{characterObj.character?.name}</h1>
                {/* <p className={Style['text-larger']}>{characterObj.character?.status} - {characterObj.character?.species}</p> */}
              </div>
              <div className={Style['text-block']}>
                <p className={Style['text-smaller']}>location</p>
                <p className={Style['text-larger']}>{characterObj.character?.location.name}</p>
              </div>
              <div className={Style['text-block']}>
                <p className={Style['text-smaller']}>First Seenn in</p>
                <p className={Style['text-larger']}>{characterObj.character?.origin.name}</p>
              </div>
              <div className={Style['text-block']}>
                <p className={Style['text-smaller']}>Dimension / TotalResidents</p>
                <p className={Style['text-larger']}>{characterObj.character?.locationMeta?.dimension} / {characterObj.character?.locationMeta?.totalResidents}</p>
              </div>
              <div className={Style['text-block']}>
                <p className={Style['text-smaller']}>Status / Type</p> 
                <p className={characterObj.character?.status === 'Dead' ? Style['text-dead'] : Style['text-alive']}>{characterObj.character?.status} <span className={Style['text-larger']}>/ {characterObj.character?.type ? characterObj.character?.type : '-' }</span></p> 
            </div>   
            </div>
          </div>)}
        {characterObj.isFetchingCharcter && ( 
              <Skeleton
                sx={{ bgcolor: 'grey.900' , borderRadius : '10px'}}
                variant="rectangular"
                width='100%'
                height={300}
              />
        )}
        {/* Profile Meta */}
        {!characterObj.isEpisodeBeenFetching && characterObj.character && (
          <div className={Style['profile-meta']}>
            <p className={Style['episode-title']}>Episodes</p>
            <div className={Style['episode-container']}>
              {characterObj.character.episodeMeta && characterObj.character.episodeMeta.map((episode, index) => {
                return (
                  <div className={Style['episode-grid']} key={index}>
                    <p className={Style['text-larger']}>-{episode.name}</p>
                    <p className={Style['text-medium']}>{episode.episode}</p>
                    <p className={Style['text-medium']}>{episode.air_date}</p>
                  </div>)
              })
              }
            </div>
          </div>)}
        {characterObj.isEpisodeBeenFetching && (
            <div className={Style['episode-container']}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((_item , index) => {
                return (
                  <div className={Style['episode-skelton']} key={index}>
                    <Skeleton
                      sx={{ bgcolor: 'grey.900' , borderRadius : '10px' }}
                      variant="rectangular"
                      width={'100%'}
                      height={'100%'}
                    />
                  </div>
                )
              })
              }
            </div>
          )
        }
      </div>
    </div>
  )
}
