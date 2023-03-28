function getFlagSize(baseSize) {
    const availableRatioArray = [
        [4, 2],
        [3, 2],
        [2, 2],
    ]
    const ratio = getArrayRandomElement(availableRatioArray)
    return [baseSize * ratio[0], baseSize * ratio[1]]
}