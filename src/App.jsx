import { BrowserRouter, Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { ShopPage } from './pages/ShopPage'
import Home from './pages/Home'

function App() {
 

  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
