
import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from './screen/Home';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/:bank/credentials' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
