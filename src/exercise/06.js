// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'
// idle: no request made yet
// pending: request started
// resolved: request successful
// rejected: request failed
function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({pokemon: null, status: 'idle'})
  const [err, setErr] = React.useState(null)
  // const [status, setStatus] = React.useState('idle')
  React.useEffect(() => {
    if (!pokemonName) return
    setState({...state, status: 'pending'})
    setErr(null)
    fetchPokemon(pokemonName).then(
      pokemon => {
        setState({pokemon, status: 'resolved'})
      },
      error => {
        setErr(error.message)
        setState({...state, status: 'rejected'})
      },
    )
  }, [pokemonName])
  if (state.status === 'rejected')
    return (
      <div role="alert">
        There was an error: <pre style={{whiteSpace: 'normal'}}>{err}</pre>
      </div>
    )
  if (state.status === 'idle') {
    return `Submit a pokemon`
  }
  if (state.status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  }
  if (state.status === 'resolved') {
    return <PokemonDataView pokemon={state.pokemon} />
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
