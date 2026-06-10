import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// 그래프 각 조각에 들어갈 색상 테마 (종목이 많아질 것을 대비해 넉넉히 준비)
const COLORS = ['#2563eb', '#dc2626', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#6b7280'];

export default function PortfolioChart({ stocks }) {
  // 1. 차트에 들어갈 데이터 가공 (종목별 총 평가금액 계산)
  const chartData = stocks.map(stock => ({
    name: stock.name,
    value: stock.quantity * stock.currentPrice // 평가 금액 = 수량 * 현재가
  })).filter(item => item.value > 0); // 평가금액이 0보다 큰 것만 표시
  const totalAsset = chartData.reduce(
  (sum, item) => sum + item.value,
  0
);

  // 주식이 아무것도 없을 때 보여줄 UI
  if (chartData.length === 0) {
    return (
      <div className="chart-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
        주식을 추가하면 자산 비중 차트가 표시됩니다.
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h3 className="chart-title">보유 자산 비중</h3>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}  /* 가운데 구멍을 뚫어서 도넛 형태로 만들기 */
            outerRadius={100}
            paddingAngle={0}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          {/* 마우스 올렸을 때 금액 콤마(,) 표시 툴팁 */}
            <Tooltip
              formatter={(value) =>
                `${((value / totalAsset) * 100).toFixed(1)}%`
              }
            />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}