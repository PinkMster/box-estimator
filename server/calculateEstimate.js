function calculateEstimate(inputData) {
    // 1. 입력 데이터 가져오기
    const {
      width,
      depth,
      height,
      quantity,
      bonding,
      coating,
      materialType,
      materialSize,
      cutCount,
      materialCount,
      printColor,
      testPrint,
    } = inputData;
  
    console.log("inputData:", inputData);
    console.log("materialType:", materialType);
    console.log("materialSize:", materialSize);
  
    const unitPrices = {
      material: {
        'WHITE': {
          size: { '46전지': 10, '하드롱': 15, '국전지': 20 },
          cut: { '1': 0, '2': 2, '4': 3 }
        },
        'BLACK': {
          size: { '46전지': 12, '하드롱': 18, '국전지': 25 },
          cut: { '1': 0, '2': 3, '4': 5 }
        },
        'KRAFT': {
          size: { '46전지': 12, '하드롱': 18, '국전지': 25 },
          cut: { '1': 0, '2': 3, '4': 5 }
        }


      },
      print: {
        '0': 0,
        '1': 5,
        '2': 8,
        '3': 10,
        '4': 12,
        
      },
      coating: 10,
      bonding: {
        '0': 0,
        '1': 5,
        '3': 10
      },
      testPrint: 50
    };
  
    console.log("unitPrices.material:", unitPrices.material);
  
    // 재료비 계산 + 유효성 검사
    let materialPrice = 0;
    if (materialType && materialSize && unitPrices.material[materialType] && unitPrices.material[materialType].size && unitPrices.material[materialType].cut) {
      materialPrice = unitPrices.material[materialType].size[materialSize] +
                      unitPrices.material[materialType].cut[cutCount];
      console.log("materialPrice:", materialPrice);
    } else {
      console.error("Error: materialType or materialSize is invalid or not provided.", materialType, materialSize);
      // materialType 또는 materialSize가 유효하지 않거나 제공되지 않았을 때의 처리.
      // 예를 들어, 사용자에게 메시지를 표시하거나, materialPrice를 0으로 유지
    }
  
    // 인쇄비
    const printPrice = unitPrices.print[printColor];
    console.log("printPrice:", printPrice);
  
    // 코팅비
    const coatingPrice = coating === 'O' ? unitPrices.coating : 0;
    console.log("coatingPrice:", coatingPrice);
  
    // 접착비
    const bondingPrice = unitPrices.bonding[bonding];
    console.log("bondingPrice:", bondingPrice);
  
    // 시야기비
    const testPrintPrice = testPrint === 'O' ? unitPrices.testPrint : 0;
    console.log("testPrintPrice:", testPrintPrice);
  
    // 기타 후가공비 (필요에 따라 추가)
    const postProcessPrice = 0;
  
    // 제작 수량 (판수 * 절수 * 연수 * 500)
    const totalQuantity = quantity * cutCount * materialCount * 500;
  
    console.log("totalQuantity:", totalQuantity);
  
    // 3. 최종 견적가 계산
    if (!materialType) {
      console.error("Error: materialType is not provided.");
      return 0;
    }
  
    const unitEstimate = ((materialPrice + coatingPrice + bondingPrice) / totalQuantity) +
                        (testPrintPrice / totalQuantity) +
                        (printPrice / totalQuantity) +
                        (postProcessPrice / totalQuantity);
  
    console.log("unitEstimate:", unitEstimate);
  
    const finalEstimate = unitEstimate * 1.4;
  
    console.log("finalEstimate:", finalEstimate);
  
    return finalEstimate;
  }
  
  module.exports = calculateEstimate;