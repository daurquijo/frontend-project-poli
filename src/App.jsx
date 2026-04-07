import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Favorites from './pages/Favorites'
import Contact from './pages/Contact'
import About from './pages/About'
import Admin from './pages/Admin'

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/servicios" element={<Layout><Services /></Layout>} />
        <Route path="/servicios/:id" element={<Layout><ServiceDetail /></Layout>} />
        <Route path="/favoritos" element={<Layout><Favorites /></Layout>} />
        <Route path="/contactanos" element={<Layout><Contact /></Layout>} />
        <Route path="/acerca-de" element={<Layout><About /></Layout>} />
        <Route path="/admin" element={<Layout><Admin /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
