// @ts-nocheck
import './style.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Experience from './component/Experience'
import Deri from './component/Deri'
import Debug from './component/Debug'
import Env from './component/Env'
import EnvMap from './component/EnvMap'
import Modal from './component/Modal'
import ThreeDText from './component/ThreeDText'
import Portfolio from './component/Portfolio'
import { AppProvider } from './store/app'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <BrowserRouter>
    <AppProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Experience />} />
          <Route path='deri' element={<Deri />} />
          <Route path='debug' element={<Debug />} />
          <Route path='env' element={<Env />} />
          <Route path='envMap' element={<EnvMap />} />
          <Route path='Modal' element={<Modal />} />
          <Route path='threeDText' element={<ThreeDText />} />
          <Route path='portfolio' element={<Portfolio />} />
        </Route>
      </Routes>
    </AppProvider>
  </BrowserRouter>
)
