import './App.css'
import { Routes,Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import DocumentsPage from './components/Documents/DocumentsPage'


function App() {
  return (
  <Routes>
    <Route path='/'  element={<Home/>} />
    <Route path='/signup'  element={<Signup/>} />
    <Route path='/login'  element={<Login/>} />
    <Route path='/documents' element={<DocumentsPage/>} />
  </Routes>
  )
}

export default App
