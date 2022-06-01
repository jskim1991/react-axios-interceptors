import { Fragment, useState } from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'
import './App.css'
import { setupResponseInterceptor } from './component/HttpClient'
import ErrorPage from "./pages/ErrorPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import StartingPage from "./pages/StartingPage";

function App() {
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(false)

    if (!isLoaded) {
        setIsLoaded(true)
        setupResponseInterceptor(navigate)
    }

    return (
        <Fragment>
            <Routes>
                <Route path='/' element={<StartingPage />} />
                <Route path='/detail' element={<ProductDetailPage />} />
                <Route path='/error' element={<ErrorPage />} />
            </Routes>
        </Fragment>
    )
}

export default App
