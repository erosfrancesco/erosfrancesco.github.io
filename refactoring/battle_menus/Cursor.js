export default class MenuCursor {

	constructor({posX = 0, posY = 0, cullX = 1, cullY = 1}) {
		this.posX = posX;
		this.posY = posY;
		this.cullX = cullX;
		this.cullY = cullY;
		this.items = [[]];
	}

	add(button, rowIndex, colIndex) {
		this.items[rowIndex] = this.items[rowIndex] || [];
		this.items[rowIndex][colIndex] = button;
	}

	up() {
		this.posY++;
	}
	down() {
		this.posY--;
	}
	left() {
		this.posX++;
	}
	right() {
		this.posX--;
	}

}