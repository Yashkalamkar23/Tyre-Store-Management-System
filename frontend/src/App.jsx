import React from 'react'
import { Route, Routes} from "react-router"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import TyreDetailPage from "./pages/TyreDetailPage"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage/>} />
        <Route path="/tyre/:id" element={<TyreDetailPage/>} />
      </Routes>
    </div>
  )
}

export default App