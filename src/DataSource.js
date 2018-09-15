export default class DataSource {
	constructor(keyExtractor, getter, sizer) {
		this._keyExtractor = keyExtractor;
		this.get = getter;
		this.size = sizer;
		this._listeners = [];

		if (! keyExtractor) {
			console.warn(
				"RecyclerViewList/DataSource: missing keyExtractor, it's strongly recommended to specify a keyExtractor function " +
					'in order to use all the features correctly.'
			);

			this._keyExtractor = (item, index) => {
				return JSON.stringify(item) + '_' + index;
			};
		}
	}

	setGetter(getter) {
		this.get = getter;
	}

	setSizer(sizer) {
		this.size = sizer;
	}

	push(item) {
		this._listeners.forEach((listener) => {
			listener && listener.onPush && listener.onPush(item);
		});
	}

	unshift(item) {
		this._listeners.forEach((listener) => {
			listener && listener.onUnshift && listener.onUnshift(item);
		});
	}

	splice(start, deleteCount, ...items) {
		this._listeners.forEach((listener) => {
			listener && listener.onSplice && listener.onSplice(start, deleteCount, ...items);
		});
	}

	moveUp(index) {
		if (index <= 0) {
			return;
		}
		this._listeners.forEach((listener) => {
			listener && listener.onMoveUp && listener.onMoveUp(index);
		});
	}

	moveDown(index) {
		if (index >= this.size() - 1) {
			return;
		}
		this._listeners.forEach((listener) => {
			listener && listener.onMoveDown && listener.onMoveDown(index);
		});
	}

	set(index, item) {
		this._listeners.forEach((listener) => {
			listener && listener.onSplice && listener.onSet(index, item);
		});
	}

	setDirty() {
		this._listeners.forEach((listener) => {
			listener && listener.onSetDirty && listener.onSetDirty();
		});
	}

	getKey(item, index) {
		return this._keyExtractor(item, index);
	}

	_addListener(listener) {
		this._listeners.push(listener);
	}

	_removeListener(listener) {
		const index = this._listeners.indexOf(listener);
		if (index > -1) {
			this._listeners.splice(index, 1);
		}
	}
}
