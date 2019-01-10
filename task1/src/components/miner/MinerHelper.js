const CellTypes = {
    empty: 0,
    bomb: 1,
    hint: 2,
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fillField(width, height) {
    var field = [...Array(width).keys()].map(x => {
        return [...Array(height).keys()].map(f => ({
            id: x * width + f,
            type: getRandomInt(0, 2),
        }));
    });

    return field;
}

export { fillField };
export default CellTypes;

// TODO: add more logic
