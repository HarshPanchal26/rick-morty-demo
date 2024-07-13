/**
 * This Component will work as layout for dashboard related pages
 *  (like Listing page for character , profile page etc..)
 * @returns 
 * 
 */

import RoutesForDashboard from './RoutesForDashboard';
import Style from './dashboard.module.css'
import Navbar from '../../components/Navbar/Navbar';



export default function LayoutForDashboard() {
    return (
        <>
            <div className={Style.main}>
                <Navbar/>
                <div className={Style['route-container']}>
                    <RoutesForDashboard/>
                </div>
            </div>
        </>
    )
}
