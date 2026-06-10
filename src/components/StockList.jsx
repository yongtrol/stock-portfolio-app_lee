import React from 'react';

export default function StockList({ stocks, onUpdate, onDelete }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>종목명</th>
            <th>보유수량</th>
            <th>매수평단가</th>
            <th>현재가</th>
            <th>수익률</th>
            <th style={{ textAlign: 'center' }}>관리</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => {
            const stockRoi = ((stock.currentPrice - stock.buyPrice) / stock.buyPrice) * 100;
            return (
              <tr key={stock.id}>
                <td className="stock-name">{stock.name}</td>
                <td>{stock.quantity} 주</td>
                <td>{stock.buyPrice.toLocaleString()} 원</td>
                <td>
                  {/* [선택 기능 - CRUD] Update: 입력창에서 현재가 변경 시 실시간 반영 */}
                  <input 
                    type="number" 
                    value={stock.currentPrice} 
                    onChange={(e) => onUpdate(stock.id, { currentPrice: Number(e.target.value) })}
                    className="input-price"
                  /> 원
                </td>
                <td className={`stock-roi ${stockRoi >= 0 ? 'positive' : 'negative'}`}>
                  {stockRoi.toFixed(2)}%
                </td>
                <td style={{ textAlign: 'center' }}>
                  {/* [선택 기능 - CRUD] Delete: 삭제 기능 */}
                  <button onClick={() => onDelete(stock.id)} className="btn-delete">
                    삭제
                  </button>
                </td>
              </tr>
            );
          })}
          {stocks.length === 0 && (
            <tr>
              <td colSpan="6" className="empty-message">
                보유 종목이 없습니다. 새로운 주식을 추가해 보세요!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}