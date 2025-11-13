import { Route, Routes } from 'react-router'
import './App.css'
import { Home } from './pages/Home'
import { SignIn } from './components/SignIn'
import { SignUp } from './components/SignUp'
import { Recipies } from './pages/Recipies'
import { RecipiesForm } from './pages/RecipiesForm'
import { MyHeader } from './components/MyHeader'


function App() {

  return (
    <div className='container'><MyHeader/>
    <Routes>
      
      <Route path="/" element={<Home/>} />
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path="/recipies" element={<Recipies/>} />
      <Route path="/addnew" element={<RecipiesForm/>} />
      <Route path="/edit/:id" element={<RecipiesForm/>} />
    </Routes>
    </div>
  )
}

export default App
