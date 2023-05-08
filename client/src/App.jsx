import Nav from './components/layout/nav'
import Footer from './components/layout/footer'
import UseDocumentTitle from './components/layout/head'


export default function App() {


  return (
    <div className='w-full'>
      <header>
        <UseDocumentTitle title='Home' />
        <Nav />
      </header>

      <main>
        <h1>Home</h1>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}