import React from 'react';

export default function PortfolioSummary({ totalBuy, totalCurrent, roi }) {
  const isPositive = roi >= 0;

  return (
    <div className="summary-container">
      <div className="card">
        <p className="card-title">총 매수 금액</p>
        <p className="card-value">{totalBuy.toLocaleString()} 원</p>
      </div>
      <div className="card">
        <p className="card-title">총 평가 금액</p>
        <p className="card-value">{totalCurrent.toLocaleString()} 원</p>
      </div>
      <div className="card">
        <p className="card-title">총 수익률</p>
        <p className={`card-value stock-roi ${isPositive ? 'positive' : 'negative'}`}>
          {roi.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}