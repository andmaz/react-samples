import * as constants from "./constants";

const CellTypes = {
    empty: 0,
    bomb: 1,
    hint: 2,
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function countBombsAround(field, row, column) {
    let sum = 0;
    for (var r = row - 1; r <= row + 1; r++) {
        for (var c = column - 1; c <= column + 1; c++) {
            sum +=
                field[r] && field[r][c] && field[r][c].type === CellTypes.bomb
                    ? 1
                    : 0;
        }
    }

    return sum;
}

// 0 0 0 1 1 1
// 0 0 0 2 * 2
// 1 1 0 2 * 2
// * 1 0 1 1 1
// 1 1 0 0 0 0

function fillField() {
    const { FIELD_WIDTH: width, FIELD_HEIGHT: height, BOMBS_COUNT } = constants;

    var field = [...Array(height).keys()].map(row =>
        [...Array(width).keys()].map(column => ({
            id: row * width + column,
            type: CellTypes.empty,
            value: null,
            row: row,
            column: column,
        }))
    );

    // generate bombs
    let addedBombsCount = 0,
        column,
        row;
    while (addedBombsCount !== BOMBS_COUNT) {
        column = getRandomInt(0, width - 1);
        row = getRandomInt(0, height - 1);

        if (field[row][column].type === CellTypes.empty) {
            field[row][column].type = CellTypes.bomb;
            addedBombsCount++;
        }
    }

    // fill hints
    field.forEach((row, rowNumber) =>
        row.forEach((cell, columnNumber) => {
            if (cell.type !== CellTypes.bomb) {
                var bombsAround = countBombsAround(
                    field,
                    rowNumber,
                    columnNumber
                );
                if (bombsAround !== 0) {
                    cell.type = CellTypes.hint;
                    cell.value = bombsAround;
                }
            }
        })
    );

    return field;
}

function updateField(field, currentCell) {
    // deep copy
    var newField = field.map(row =>
        row.map(cell =>
            Object.assign({}, cell, {
                open:
                    currentCell.id === cell.id ||
                    cell.open ||
                    currentCell.type === CellTypes.bomb,
            })
        )
    );

    // only <CellTypes.empty> cells may be expanded
    if (currentCell.type !== CellTypes.empty) {
        return newField;
    }

    var processed = Object.create(null);
    expandCells(newField, currentCell.row, currentCell.column, processed);

    for (var key in processed) {
        newField[key.split("_")[0]][key.split("_")[1]].open = true;
    }

    return newField;
}

function expandCells(field, row, column, processed) {
    processed[`${row}_${column}`] = true;

    if (field[row][column].type !== CellTypes.empty) {
        return;
    }

    var neighbors = findNeighbors(field, row, column, processed);
    neighbors.forEach(element => {
        expandCells(field, element.row, element.column, processed);
    });
}

function findNeighbors(field, row, column, processed) {
    const res = [];
    const cellValid = (r, c) =>
        field[r] &&
        field[r][c] &&
        field[r][c].type !== CellTypes.bomb &&
        processed[`${r}_${c}`] !== true;

    [column - 1, column + 1].forEach(c => {
        if (cellValid(row, c)) {
            res.push(field[row][c]);
        }
    });

    [row - 1, row + 1].forEach(r => {
        if (cellValid(r, column)) {
            res.push(field[r][column]);
        }
    });

    return res;
}

export { fillField, updateField };
export default CellTypes;

// TODO: add more logic
