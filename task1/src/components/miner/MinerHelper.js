import { FIELD_WIDTH, FIELD_HEIGHT, BOMBS_COUNT } from "./constants";
import { get } from "lodash";

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

function getNeighbors(field, targetCell) {
    const { row, column } = targetCell;
    const neighbors = [];
    for (var r = row - 1; r <= row + 1; r++) {
        for (var c = column - 1; c <= column + 1; c++) {
            const cell = get(field, [r, c]);
            if (cell && (r !== row || c !== column)) {
                neighbors.push(cell);
            }
        }
    }

    return neighbors;
}

function countBombsAround(field, targetCell) {
    const neighbors = getNeighbors(field, targetCell);
    return neighbors.reduce(
        (sum, cell) => sum + (cell.type === CellTypes.bomb),
        0
    );
}

function generateField() {
    const field = [...Array(FIELD_HEIGHT).keys()].map(row =>
        [...Array(FIELD_WIDTH).keys()].map(column => ({
            id: row * FIELD_WIDTH + column,
            type: CellTypes.empty,
            markType: MarksTypes.empty,
            value: null,
            row: row,
            column: column,
        }))
    );

    // generate bombs
    let addedBombsCount = 0;
    while (addedBombsCount !== BOMBS_COUNT) {
        const column = getRandomInt(0, FIELD_WIDTH - 1);
        const row = getRandomInt(0, FIELD_HEIGHT - 1);
        const cell = field[row][column];

        if (cell.type === CellTypes.empty) {
            cell.type = CellTypes.bomb;
            addedBombsCount++;
        }
    }

    // fill hints
    field.forEach(row =>
        row.forEach(cell => {
            if (cell.type !== CellTypes.bomb) {
                var bombsAround = countBombsAround(field, cell);
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
            if (markType === MarksTypes.bomb && cell.type === CellTypes.bomb) {
                markedCount++;
            }

            return { ...cell, markType };
        })
    );

    if (markedCount === BOMBS_COUNT) {
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

            return {
                ...cell,
                open: isCurrent || cell.open || openBomb,
                markType: isCurrent ? MarksTypes.empty : cell.markType,
            };
        })
    );

    const processed = new Set();
    expandCells(newField, currentCell, processed);

    processed.forEach(cell => {
        cell.open = true;
    });

    return newField;
}

function expandCells(field, cell, processed) {
    // only empty or hint may be expanded
    if (cell.type === CellTypes.empty || cell.type === CellTypes.hint) {
        processed.add(cell);
    }

    // process neighbors only for empty cell
    if (cell.type !== CellTypes.empty) {
        return;
    }

    getNeighbors(field, cell)
        .filter(neighbor => !processed.has(neighbor))
        .forEach(neighbor => {
            expandCells(field, neighbor, processed);
        });
}

export { generateField, updateField, updateFieldMark, CellTypes, MarksTypes };
export default CellTypes;
