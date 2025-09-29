import React from 'react'
import LandingPage from '../pages/website/LandingPage'
import { Route, Routes } from 'react-router-dom'
import ErrorPage from '../pages/admin/ErrorPage'
import About from '../pages/website/About'
import Shop from '../pages/website/Shop'
import WebsiteLayout from '../layouts/WebsiteLayout'

const WebsiteRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<WebsiteLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="about" element={<About />} />
                <Route path="shop" element={<Shop />} />
                {/* Catch-all */}
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    )
}

export default WebsiteRoutes
