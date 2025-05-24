import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './pages/LoginPage'
import Layout from './common/Layout'
import PrivateRoute from './common/PrivateRoute';

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route element={<PrivateRoute />}>
            <Route path="/*" element={<Layout />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

