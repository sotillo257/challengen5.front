import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NavBar from '../components/NavBar';
import App from '../containers/App'
import Permission from '../containers/Permission';

export default function Router() {
  return (
    <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/New" element={<Permission />} />            
        </Routes>
    </BrowserRouter>
  )
}
