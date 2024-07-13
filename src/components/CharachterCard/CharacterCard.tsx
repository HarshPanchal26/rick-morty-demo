import { TypeCharacters } from '../../utils/type'
import Style from './charachte-card.module.css'
import { NavLink} from 'react-router-dom';

export default function CharacterCard({charachter} : {charachter :TypeCharacters}) {


  return (
    <NavLink className={Style.card} to={`/character/profile/${charachter.id}`}>
        <div className={Style.profile}>
            <img className={Style.img} src={`https://rickandmortyapi.com/api/character/avatar/${charachter.id}.jpeg`} alt={`Profile image of ${charachter.name}`}></img>
        </div>
        <div className={Style.info}>
            <div>
                <p className={Style['text-x-larger']}>{charachter.name}</p> 
            </div>    
            <div>
                <p className={Style['text-smaller']}>location</p> 
                <p className={Style['text-larger']}>{charachter.location.name}</p> 
            </div>    
            <div>
                <p className={Style['text-smaller']}>First Seenn in</p> 
                <p className={Style['text-larger']}>{charachter.origin.name}</p> 
            </div>
            <div>
                <p className={Style['text-smaller']}>Status / Type</p> 
                <p className={charachter.status === 'Dead' ? Style['text-dead'] : Style['text-alive']}>{charachter.status} <span className={Style['text-larger']}>/ {charachter.type ? charachter.type : '-' }</span></p> 
            </div>    
        </div>
    </NavLink>
  )
}
