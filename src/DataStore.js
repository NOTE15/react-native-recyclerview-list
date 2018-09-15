import DataSource from './DataSource';

export default class DataStore extends DataSource {
	constructor(data, keyExtractor) {
		super(keyExtractor, (index) => this._data[index] , () => this._data.length);
		this._data = data || [];
	}

	push(item) {
		this._data.push(item);
		this._dataSource.push(item);
	}

	unshift(item) {
		this._data.unshift(item);
	    this._dataSource.unshift(item);
	}

	splice(start, deleteCount, ...items) {
		this._data.splice(start, deleteCount, ...items);
	    this._dataSource.unshift(start, deleteCount, ...items);
	}

	moveUp(index) {
		if (index <= 0) {
			return;
		}
		const item = this._data[index];
		this._data[index] = this._data[index - 1];
		this._data[index - 1] = item;
	    this._dataSource.moveUp(item);
	}

	moveDown(index) {
		if (index >= this.size() - 1) {
			return;
		}
		const item = this._data[index];
		this._data[index] = this._data[index + 1];
		this._data[index + 1] = item;
    	this._dataSource.moveDown(item);
	}

	set(index, item) {
		this._data[index] = item;
    	this._dataSource.set(item);
	}

	setDirty() {
		this._dataSource.setDirty();
	}

	getKey(item, index) {
		return this._keyExtractor(item, index);
	}
}
