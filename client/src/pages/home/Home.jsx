import Nav from '../../components/layout/nav'
import Footer from '../../components/layout/footer'
import UseDocumentTitle from '../../components/layout/head'
import { Outlet } from 'react-router-dom'

export default function Home() {
    return (
        <div className='w-full'>
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
        </div>
    )
}
