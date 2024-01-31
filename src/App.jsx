import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Landing from "./components/Landing"
import SignUp from "./components/SignUp"
import Login from "./components/Login"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path= "/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>} />
        <Route path="/signin" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
