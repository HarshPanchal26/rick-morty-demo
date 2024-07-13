/**
 * Routes listing for dashboard layouts
 * @returns 
 */

import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharactersList from '../../pages/CharachterList/CharactersList';
import CharactersProfile from '../../pages/Profile/CharactersProfile';


export default function RoutesForDashboard() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Suspense fallback={<div>Loading......</div>}>
                            <CharactersList />
                        </Suspense>
                    }
                />
            </Routes>
            <Routes>
                <Route
                    path="/characters" 
                    element={
                        <Suspense fallback={<div>Loading......</div>}>
                            <CharactersList />
                        </Suspense>
                    }
                />
            </Routes>
            <Routes>
                <Route
                    path="character/profile/:id"
                    element={
                        <Suspense fallback={<div>Loading......</div>}>
                            <CharactersProfile />
                        </Suspense>
                    }
                />
            </Routes>
        </Router>
    )
}
