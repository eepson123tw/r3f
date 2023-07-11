// @ts-nocheck
import './style.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Experience from './component/Experience'
import Deri from './component/Deri'
import Debug from './component/Debug'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Experience />} />
        <Route path='deri' element={<Deri />} />
        <Route path='debug' element={<Debug />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
