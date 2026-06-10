import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // 🔥 라우터 임포트
import Navbar from './components/Navbar'; // 🔥 메뉴바 임포트
import PortfolioSummary from './components/PortfolioSummary';
import StockForm from './components/StockForm';
import StockList from './components/StockList';
import PortfolioChart from './components/PortfolioChart';

export default function App() {
  const [stocks, setStocks] = useState(() => {
    const savedStocks = localStorage.getItem('my_portfolio');
    return savedStocks ? JSON.parse(savedStocks) : [
      { id: 1, name: '삼성전자', quantity: 50, buyPrice: 70000, currentPrice: 75000 },
      { id: 2, name: 'SK하이닉스', quantity: 20, buyPrice: 150000, currentPrice: 142000 }
    ];
  });

  useEffect(() => {
    localStorage.setItem('my_portfolio', JSON.stringify(stocks));
  }, [stocks]);

  const handleAddStock = (newStock) => {
    setStocks([...stocks, { ...newStock, id: Date.now() }]);
  };

  const handleUpdateStock = (id, updatedFields) => {
    setStocks(stocks.map(stock => stock.id === id ? { ...stock, ...updatedFields } : stock));
  };

  const handleDeleteStock = (id) => {
    setStocks(stocks.filter(stock => stock.id !== id));
  };

  const totalBuyAsset = stocks.reduce((sum, stock) => sum + (stock.buyPrice * stock.quantity), 0);
  const totalCurrentAsset = stocks.reduce((sum, stock) => sum + (stock.currentPrice * stock.quantity), 0);
  const totalProfitLoss = totalCurrentAsset - totalBuyAsset;
  const totalRoi = totalBuyAsset === 0 ? 0 : (totalProfitLoss / totalBuyAsset) * 100;

  return (
    // 전체를 BrowserRouter로 감싸야 페이지 이동 기능이 작동해!
    <BrowserRouter>
      <div className="container">
        <h1>📊 포트폴리오</h1>
        
        {/* 상단 메뉴바 고정 */}
        <Navbar />

        {/* 대시보드 요약 카드는 어떤 메뉴를 눌러도 상단에 계속 보이도록 유지 */}
        <PortfolioSummary 
          totalBuy={totalBuyAsset} 
          totalCurrent={totalCurrentAsset} 
          roi={totalRoi} 
        />

        {/* 주소(경로)에 따라 바뀌는 화면 영역 */}
        <div className="page-content">
          <Routes>
            {/* 기본 주소일 때는 폼과 테이블을 보여줌 */}
            <Route path="/" element={
              <div className="main-content">
                <StockForm onAddStock={handleAddStock} />
                <StockList 
                  stocks={stocks} 
                  onUpdate={handleUpdateStock} 
                  onDelete={handleDeleteStock} 
                />
              </div>
            } />

            {/* /chart 주소로 들어오면 차트만 크게 보여줌 */}
            <Route path="/chart" element={
              <PortfolioChart stocks={stocks} />
            } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}