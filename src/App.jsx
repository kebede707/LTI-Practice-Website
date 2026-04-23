import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { DataProvider } from './context/DataContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Scholarships from './pages/Scholarships'
import Programs from './pages/Programs'
import Admin from './pages/Admin'

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="scholarships" element={<Scholarships />} />
            <Route path="programs" element={<Programs />} />
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </DataProvider>
    </AuthProvider>
  )
}

export default App
