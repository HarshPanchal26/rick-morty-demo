/**
 * Componenet to show up when user hits invalid requests.
 */

import Style from './invalid.request.module.css'
import { NavLink } from 'react-router-dom'

export default function InvalidRequest() {
  return (
    <div className={Style.container}>
        <div className={Style['modal-invalid']}>
             <h3>Sorry ! No data found</h3>
             <h5><NavLink to='/'>Go Back to home</NavLink></h5>
        </div>
    </div>
  )
}
