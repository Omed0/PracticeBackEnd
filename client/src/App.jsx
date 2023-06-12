import Nav from './components/layout/nav'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Auth } from './features/auth/authSlice'
import Footer from './components/layout/footer'
import UseDocumentTitle from './components/layout/head'

export default function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(Auth())
  }, [])

  return (
    <main>
      <header>
        <UseDocumentTitle title='Home' />
        <Nav />
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </main>
  )
}