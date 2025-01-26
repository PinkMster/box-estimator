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

    //견적 계산에 필요한 값들 (실제 값으로 대체 필요)
    const unitPrices = {
        material: {
            'A': {
                size: { 'S': 10, 'M': 15, 'L': 20 },
                cut: { '1': 0, '2': 2, '4': 3 }
            },
            'B': {
                size: { 'S': 12, 'M': 18, 'L': 25 },
                cut: { '1': 0, '2': 3, '4': 5 }
            },
        },
        print: {
            '1': 5,
            '2': 8,
            // ...
        },
        coating: 10,
        bonding: 5,
        testPrint: 50
    };

    // 재료비
    const materialPrice = unitPrices.material[materialType].size[materialSize] +
                        unitPrices.material[materialType].cut[cutCount];

    // 인쇄비
    const printPrice = unitPrices.print[printColor];

    // 코팅비
    const coatingPrice = coating === 'O' ? unitPrices.coating : 0;

    // 접착비
    const bondingPrice = bonding === 'O' ? unitPrices.bonding : 0;

    // 시야기비
    const testPrintPrice = testPrint === 'O' ? unitPrices.testPrint : 0;

    // 기타 후가공비 (필요에 따라 추가)
    const postProcessPrice = 0;

    // 제작 수량
    const totalQuantity = quantity * materialCount / cutCount;

    // 3. 최종 견적가 계산
    if (materialType === "값이 없음" || !materialType) {
        return 0;
    }

    const unitEstimate = ((materialPrice + coatingPrice + bondingPrice) / totalQuantity) +
                        (testPrintPrice / totalQuantity) +
                        (printPrice / totalQuantity) +
                        (postProcessPrice / totalQuantity);

    const finalEstimate = unitEstimate * 1.4;

    return finalEstimate;
}

module.exports = calculateEstimate;