/**
 * Basic Navbar component for Dashboard layout.
 */
import Style from './navbar.module.css'

export default function Navbar() {
  return (
    <div className={Style.navbar}>
       <h1 className={Style.heading} >The Rick and Morty</h1>
    </div>
  )
}
