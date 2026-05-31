import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Analyze } from './pages/Analyze'
import { History } from './pages/History'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Analyze />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  )
}
