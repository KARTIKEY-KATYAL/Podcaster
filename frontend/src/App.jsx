import './App.css'
import { BrowserRouter as Router ,Routes , Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import AuthLayout from './layout/AuthLayout'
import Home from './pages/Home'
import SignUp from './pages/signup'
import Login from './pages/Login'
import Categories from './pages/Categories'
import Allpodcast from './pages/Allpodcast'
import Profile from './pages/Profile'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/all-podcast" element={<Allpodcast />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/" element={<AuthLayout />}>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App
