import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import FeedPage from './Pages/FeedPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      {/* Login/Signup success ke baad user yahi feed route par land karega. */}
      <Route path='/feed' element={<FeedPage />} />
    </Routes>
  )
}

export default App
