import React, { useState } from 'react';
import axios from 'axios';

function CalculatorForm() {
    const [inputData, setInputData] = useState({
        width: 0,
        depth: 0,
        height: 0,
        quantity: 1,
        bonding: 'X',
        coating: 'X',
        materialType: '',
        materialSize: '',
        cutCount: '1',
        materialCount: 1,
        printColor: '1',
        testPrint: 'X',
    });
    const [estimate, setEstimate] = useState(0);

    const handleChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/calculate', inputData); // 서버 주소 변경
            setEstimate(response.data.estimate);
        } catch (error) {
            console.error('Error calculating estimate:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* 입력 폼 */}
            <div>
                <label htmlFor="width">가로(mm):</label>
                <input type="number" id="width" name="width" value={inputData.width} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="depth">폭(mm):</label>
                <input type="number" id="depth" name="depth" value={inputData.depth} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="height">높이(mm):</label>
                <input type="number" id="height" name="height" value={inputData.height} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="quantity">판수:</label>
                <input type="number" id="quantity" name="quantity" value={inputData.quantity} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="bonding">접착:</label>
                <select id="bonding" name="bonding" value={inputData.bonding} onChange={handleChange}>
                    <option value="O">O</option>
                    <option value="X">X</option>
                </select>
            </div>
            <div>
                <label htmlFor="coating">코팅:</label>
                <select id="coating" name="coating" value={inputData.coating} onChange={handleChange}>
                    <option value="O">O</option>
                    <option value="X">X</option>
                </select>
            </div>
            <div>
                <label htmlFor="materialType">원단 종류:</label>
                <select id="materialType" name="materialType" value={inputData.materialType} onChange={handleChange}>
                    <option value="">값이 없음</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    {/* ... 다른 원단 종류 옵션들 ... */}
                </select>
            </div>
            <div>
                <label htmlFor="materialSize">규격:</label>
                <select id="materialSize" name="materialSize" value={inputData.materialSize} onChange={handleChange}>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                </select>
            </div>
            <div>
                 <label htmlFor="cutCount">절수:</label>
                 <select id="cutCount" name="cutCount" value={inputData.cutCount} onChange={handleChange}>
                   <option value="1">1</option>
                   <option value="2">2</option>
                   <option value="4">4</option>
                 </select>
               </div>
               <div>
                 <label htmlFor="materialCount">연수:</label>
                 <input type="number" id="materialCount" name="materialCount" value={inputData.materialCount} onChange={handleChange} />
               </div>
               <div>
                 <label htmlFor="printColor">인쇄도수:</label>
                 <select id="printColor" name="printColor" value={inputData.printColor} onChange={handleChange}>
                   <option value="1">1</option>
                   <option value="2">2</option>
                   {/* ... 다른 인쇄 도수 옵션 ... */}
                 </select>
               </div>
               <div>
                 <label htmlFor="testPrint">시야기:</label>
                 <select id="testPrint" name="testPrint" value={inputData.testPrint} onChange={handleChange}>
                   <option value="O">O</option>
                   <option value="X">X</option>
                 </select>
               </div>

            <button type="submit">견적 계산</button>

            {/* 견적 결과 표시 */}
            {estimate > 0 && (
                <div>
                    <h3>견적 결과:</h3>
                    <p>{estimate.toFixed(2)} 원</p>
                </div>
            )}
        </form>
    );
}

export default CalculatorForm;