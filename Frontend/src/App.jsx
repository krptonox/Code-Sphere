import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import FeedPage from './Pages/FeedPage'
import Group from './application/Group'
import Friends from './application/Friends'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/feed' element={<FeedPage />} />
      <Route path='/friends' element={<Friends />} />
      <Route path='/groups' element={<Group />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}

export default App
