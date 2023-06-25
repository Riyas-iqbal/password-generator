import { Link } from "react-router-dom"

function App() {
  return (
    <div>
      <div >
        <div><Link to='/generate-password'>Generate Passowrd</Link></div>
        <div><Link to='/generate-uniqueid'>Generate Unique Id</Link></div>
        <div><Link to='/notes'>Notes</Link></div>
        <div><Link to='/weather'>Weather</Link></div>
      </div>
    </div>
  )
}

export default App