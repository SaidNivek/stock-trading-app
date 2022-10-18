import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StockOverviewPage from './pages/StockOverviewPage'
import StockDetailPage from './pages/StockDetailPage'

function App() {
  return (
    <main>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<StockOverviewPage />}></Route>
        <Route path="/detail/:symbol" element={<StockDetailPage />}></Route>
      </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;