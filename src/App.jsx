import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PrivateRoutes from './components/PrivateRoutes'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Offerer from './pages/Offerer/Offerer'
import NotFound from './pages/NotFound'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>

          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route element={<PrivateRoutes />}>

            <Route index element={<Home />} />
            <Route path='offerer' element={<Offerer />} />

          </Route>
          <Route path='*' element={<NotFound />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
