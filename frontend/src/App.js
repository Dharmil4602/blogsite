import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './components/authentication/Login'
import Singup from "./components/authentication/Singup"
import Navbar from "./components/navbar/Navbar"
import AddBlog from "./components/blogger/AddBlog"
import Dashboard from "./components/blogger/Dashboard"
import Home from "./components/home/Home"
function App() {

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path="/signup" element={<Singup/>} />
          <Route path="/add-blog" element={<AddBlog/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App

