import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import Form from './components/Form'
import './App.css'

function App() {

  return (
    <>
    <BrowserRouter>
      <div className="App">
      <h1>books</h1>
      <Routes>
        <Route path="/" element={<Form />}/>
      </Routes>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
