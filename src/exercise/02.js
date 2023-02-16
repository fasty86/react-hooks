// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
function useLocalStorageState(key, val) {
  const getFromLocalStorage = () => JSON.parse(window.localStorage.getItem(key))
  const [value, setValue] = React.useState(getFromLocalStorage || val)

  React.useEffect(
    () => window.localStorage.setItem(key, JSON.stringify(value)),
    [key, value],
  )
  return [value, setValue]
}

function Greeting({initialName = 'oleg'}) {
  const [name, setName] = useLocalStorageState('name', initialName)
  function handleChange(event) {
    setName(prev => {
      console.log(prev)
      return event.target.value
    })
  }
  function submitHandler(evt) {
    evt.preventDefault()
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
