import { useNavigate } from 'react-router-dom'

const Home = () => {
 const navigate = useNavigate()
  return (
    <div>
        <h1 className="home-h1">Välkommen till din Productivity Assistant App!</h1>
        <h3 className="home-h3">Logga in för att använda appen...</h3>
    </div>
  )
}

export default Home