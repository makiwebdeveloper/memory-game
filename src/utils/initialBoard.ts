import { ICell } from "../types/Cell.interface";

const initialBoard: ICell[] = [];

const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
const items = numbers.concat(numbers).sort(() => Math.random() - 0.5);

for (let i = 1; i <= items.length; i++) {
  initialBoard.push({
    id: i,
    item: items[i - 1],
    isVisible: false,
    isFinded: false,
  });
}

export default initialBoard;
