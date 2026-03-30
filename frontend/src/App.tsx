import { Routes, Route, BrowserRouter } from "react-router-dom";

import LoginPage from './pages/LoginPage.tsx';

import HomePage from "./pages/HomePage.tsx";
// import FavoritePage from "./pages/FavoritePage.tsx";
// import TrashPage from "./pages/TrashPage.tsx";
import { NotFound } from "./pages/errors/NotFound.tsx";
import ContextMenu from "./components/layout/ContextMenu.tsx";


export default function App() {
  return(
    <>
      <ContextMenu />

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/home" element={<HomePage />} />
          {/* <Route path="/favorite" element={<FavoritePage />} />
          <Route path="/trash" element={<TrashPage />} /> */}

          <Route path="*" element={<NotFound />} />
        </Routes> 
      </BrowserRouter>
    </>
  )  
}

