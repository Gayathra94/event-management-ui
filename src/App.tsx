import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './pages/LoginPage'
import Layout from './common/Layout'

function App() {

  return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/*" element={<Layout />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  )
}

export default App
