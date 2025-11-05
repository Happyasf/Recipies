
import { Route, Routes } from 'react-router'
import './App.css'
import { Home } from './pages/Home'
import { Recipies } from './pages/Recipies'
import { RecipiesForm } from './pages/RecipiesForm'

function App() {


  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/recipies' element={<Recipies/>}/>
      <Route path='/addnew' element={<RecipiesForm/>}/>
    </Routes>
  )
}

export default App
