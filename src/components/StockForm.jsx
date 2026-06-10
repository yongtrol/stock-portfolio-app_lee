import React, { useState } from 'react';

export default function StockForm({ onAddStock }) {
  const [form, setForm] = useState({ name: '', quantity: '', buyPrice: '', currentPrice: '' });

  // [필수 기술] 이벤트 처리 - Input 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // [필수 기술] 이벤트 처리 - Form 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.quantity || !form.buyPrice) {
      alert('필수 항목을 모두 입력해주세요!');
      return;
    }

    onAddStock({
      name: form.name,
      quantity: Number(form.quantity),
      buyPrice: Number(form.buyPrice),
      currentPrice: form.currentPrice ? Number(form.currentPrice) : Number(form.buyPrice)
    });

    // 인풋 폼 초기화
    setForm({ name: '', quantity: '', buyPrice: '', currentPrice: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="stock-form">
      <h3>종목 추가</h3>
      <div className="form-group">
        <label>종목명 *</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="예: 삼성전자" />
      </div>
      <div className="form-group">
        <label>보유 수량 *</label>
        <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="0" />
      </div>
      <div className="form-group">
        <label>매수 평단가 *</label>
        <input type="number" name="buyPrice" value={form.buyPrice} onChange={handleChange} placeholder="0" />
      </div>
      <div className="form-group">
        <label>현재가 (선택)</label>
        <input type="number" name="currentPrice" value={form.currentPrice} onChange={handleChange} placeholder="미입력시 매수가 적용" />
      </div>
      <button type="submit" className="btn-submit">추가하기</button>
    </form>
  );
}