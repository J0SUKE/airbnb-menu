import React from 'react'
import Header from './components/Header'
import Filter,{DestinationMenu,DureeMenu,VoyageursMenu} from './components/Filter'

function App() {
  return (
    <>
      <Header>
        <Filter/>
      </Header>
      <div className="overlay">
        
      </div>
    </>
  )
}

export default App