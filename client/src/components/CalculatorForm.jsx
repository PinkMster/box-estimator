import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function CalculatorForm({ setEstimate, setWidth, setDepth, setHeight, setMaterialType }) { // props 추가
  const [inputData, setInputData] = useState({
    width: 0,
    depth: 0,
    height: 0,
    quantity: 1,
    bonding: '0',
    coating: 'X',
    materialType: '',
    materialSize: '',
    cutCount: '1',
    materialCount: 0.5,
    printColor: '1',
    testPrint: 'X',
  });

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputData.materialType) {
      alert("원단 종류를 선택해주세요.");
      return;
    }
    if (!inputData.materialSize) {
      alert("규격을 선택해주세요.");
      return;
    }
    try {
      const response = await axios.post('/api/calculate', inputData);
      setEstimate(response.data.estimate);

      setWidth(parseFloat(inputData.width));
      setDepth(parseFloat(inputData.depth));
      setHeight(parseFloat(inputData.height));
      setMaterialType(inputData.materialType);
    } catch (error) {
      console.error('Error calculating estimate:', error);
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        console.error("Error Response Status:", error.response.status);
        console.error("Error Response Headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error Request:", error.request);
      } else {
        console.error("Error Message:", error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="width">가로(mm):</label>
        <input
          type="number"
          id="width"
          name="width"
          value={inputData.width}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="depth">폭(mm):</label>
        <input
          type="number"
          id="depth"
          name="depth"
          value={inputData.depth}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="height">높이(mm):</label>
        <input
          type="number"
          id="height"
          name="height"
          value={inputData.height}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="quantity">판수:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={inputData.quantity}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="bonding">접착:</label>
        <select
          id="bonding"
          name="bonding"
          value={inputData.bonding}
          onChange={handleChange}
        >
          <option value="0">없음</option>
          <option value="1">단면</option>
          <option value="3">삼면</option>
        </select>
      </div>
      <div>
        <label htmlFor="coating">코팅:</label>
        <select
          id="coating"
          name="coating"
          value={inputData.coating}
          onChange={handleChange}
        >
          <option value="O">O</option>
          <option value="X">X</option>
        </select>
      </div>
      <div>
        <label htmlFor="materialType">원단 종류:</label>
        <select
          id="materialType"
          name="materialType"
          value={inputData.materialType}
          onChange={handleChange}
        >
          <option value="">값이 없음</option>
          <option value="WHITE">ab라이트270g</option>
          <option value="BLACK">흑지350g</option>
          <option value="KRAFT">크라프트 KLB337g</option>
        </select>
      </div>
      <div>
        <label htmlFor="materialSize">규격:</label>
        <select
          id="materialSize"
          name="materialSize"
          value={inputData.materialSize}
          onChange={handleChange}
        >
          <option value="">값이 없음</option>
          <option value="46전지">46전지</option>
          <option value="하드롱">하드롱</option>
          <option value="국전지">국전지</option>
        </select>
      </div>
      <div>
        <label htmlFor="cutCount">절수:</label>
        <select
          id="cutCount"
          name="cutCount"
          value={inputData.cutCount}
          onChange={handleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="4">4</option>
        </select>
      </div>
      <div>
        <label htmlFor="materialCount">연수:</label>
        <select
          id="materialCount"
          name="materialCount"
          value={inputData.materialCount}
          onChange={handleChange}
        >
          <option value="0.5">0.5</option>
          <option value="1">1</option>
        </select>
      </div>
      <div>
        <label htmlFor="printColor">인쇄도수:</label>
        <select
          id="printColor"
          name="printColor"
          value={inputData.printColor}
          onChange={handleChange}
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <div>
        <label htmlFor="testPrint">시야기:</label>
        <select
          id="testPrint"
          name="testPrint"
          value={inputData.testPrint}
          onChange={handleChange}
        >
          <option value="O">O</option>
          <option value="X">X</option>
        </select>
      </div>

      <button type="submit">견적 계산</button>
    </form>
  );
}

CalculatorForm.propTypes = {
  setEstimate: PropTypes.func.isRequired,
  setWidth: PropTypes.func.isRequired, // propTypes 추가
  setDepth: PropTypes.func.isRequired, // propTypes 추가
  setHeight: PropTypes.func.isRequired, // propTypes 추가
  setMaterialType: PropTypes.func.isRequired, // propTypes 추가
};

export default CalculatorForm;