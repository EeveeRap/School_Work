import './App.css'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <h1>Real Estate Website</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit est iste recusandae. Officiis officia sit hic nemo debitis veniam. Excepturi inventore autem magni dolorum mollitia, voluptatibus explicabo tempora exercitationem, porro blanditiis itaque voluptates? Obcaecati voluptas repellat iusto veritatis reprehenderit provident natus dolore, ea, perferendis mollitia debitis corrupti ratione facere consequuntur.</p>
      <Navbar />
      <hr />
      <Outlet />
    </>
      
  )
}

export default App
