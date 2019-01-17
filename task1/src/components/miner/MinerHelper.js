import * as constants from "./constants";

const CellTypes = {
    empty: 0,
    bomb: 1,
    hint: 2,
};

const MarksTypes = {
    empty: 0,
    bomb: 1,
    unknown: 2,
    getNext(markType) {
        switch (markType) {
            case MarksTypes.empty:
                return MarksTypes.bomb;
            case MarksTypes.bomb:
                return MarksTypes.unknown;
            case MarksTypes.unknown:
                return MarksTypes.empty;
            default:
                return MarksTypes.empty;
        }
    },
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

function generateField() {
    const { FIELD_WIDTH: width, FIELD_HEIGHT: height, BOMBS_COUNT } = constants;

    const field = [...Array(height).keys()].map(row =>
        [...Array(width).keys()].map(column => ({
            id: row * width + column,
            type: CellTypes.empty,
            markType: MarksTypes.empty,
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

function updateFieldMark(field, currentCell) {
    // deep copy
    let markedCount = 0;
    const newField = field.map(row =>
        row.map(cell => {
            const isCurrent = currentCell.id === cell.id;
            const markType = isCurrent
                ? MarksTypes.getNext(cell.markType)
                : cell.markType;
            if (markType === MarksTypes.bomb) {
                markedCount++;
            }

            return Object.assign({}, cell, { markType });
        })
    );

    if (markedCount === constants.BOMBS_COUNT) {
        // TODO: won
        console.log("WON!");
    }
    return newField;
}

function updateField(field, currentCell) {
    const openBomb = currentCell.type === CellTypes.bomb;

    // deep copy
    const newField = field.map(row =>
        row.map(cell => {
            const isCurrent = currentCell.id === cell.id;
            return Object.assign({}, cell, {
                open: isCurrent || cell.open || openBomb,
                markType: isCurrent ? MarksTypes.empty : cell.markType,
            });
        })
    );

    // only <CellTypes.empty> cells may be expanded
    if (currentCell.type !== CellTypes.empty) {
        return newField;
    }

    const processed = Object.create(null);
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

    if (field[row][column].type === CellTypes.empty) {
        [column - 1, column + 1].forEach(c => {
            [row - 1, row + 1].forEach(r => {
                if (cellValid(r, c)) {
                    res.push(field[r][c]);
                }
            });
        });
    }

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

export { generateField, updateField, updateFieldMark, CellTypes, MarksTypes };
export default CellTypes;

// TODO: add more logic
