import React from 'react'
import LandingPage from '../pages/website/LandingPage'
import { Route, Routes } from 'react-router-dom'
import ErrorPage from '../pages/admin/ErrorPage'
import About from '../pages/website/About'
import Shop from '../pages/website/Shop'
import WebsiteLayout from '../layouts/WebsiteLayout'
import ProductDetailPage from '../pages/website/ProductDetailPage'
import ContactUs from '../pages/website/ContactUs'
import ShoppingCartCheckout from '../pages/website/ShoppingCartCheckout'
import BloodDonationForm from '../components/website/LandingPage/BloodDonationForm'
import OrganDonationForm from '../components/website/LandingPage/OrganDonationForm'

const WebsiteRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<WebsiteLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="about" element={<About />} />
                <Route path="shop" element={<Shop />} />
                <Route path="shop/:id" element={<ProductDetailPage />} />
                <Route path="contact" element={<ContactUs />} />
                <Route path="checkout" element={<ShoppingCartCheckout />} />
                <Route path="organ-form" element={<OrganDonationForm />} />
                <Route path="blood-form" element={<BloodDonationForm />} />
                {/* Catch-all */}
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    )
}

export default WebsiteRoutes
