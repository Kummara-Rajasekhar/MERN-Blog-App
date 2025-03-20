
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-bgPrimary min-h-screen flex-col'>
        <Navbar/>
        <div className='flex-grow'>
          <Outlet />
        </div>
        <footer className='mt-auto'>
          Footer
        </footer>
      </div>



    </>
  )
}

export default App
