'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TodoList = function () {
	function TodoList() {
		var _this = this;

		_classCallCheck(this, TodoList);

		this.items = [];
		this.showCompleted = true;

		this.$todoListUL = document.querySelector('.todo ul');
		this.$doneCounter = document.querySelector('.todo .done');
		this.$totalCounter = document.querySelector('.todo .total');

		var $newItemElement = document.querySelector('[name="new-item"]');
		$newItemElement.addEventListener('keyup', function (event) {
			if (event.key !== 'Enter') return false;
			_this.items.push(new TodoItem(event.currentTarget.value));
			event.currentTarget.value = '';
			_this.render();
		});

		var $showCompletedCheckbox = document.querySelector('[name="show-completed"]');
		$showCompletedCheckbox.addEventListener('change', function (e) {
			_this.showCompleted = $showCompletedCheckbox.checked;
			_this.render();
		});

		window.addEventListener('itemchanged', this.render.bind(this));
		this.render();
	}

	// the render function handles putting the items in the DOM. 
	// everything inside each item is handled by its own render function


	_createClass(TodoList, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			console.log('TodoList::render()');
			this.items.forEach(function (item) {
				if (item.done && !_this2.showCompleted) {
					item.$element.remove();
				} else {
					_this2.$todoListUL.appendChild(item.$element);
				}
			});
			this.$totalCounter.innerText = this.items.length;
			this.$doneCounter.innerText = this.items.filter(function (item) {
				return item.done;
			}).length;
		}
	}]);

	return TodoList;
}();

var TodoItem = function () {
	function TodoItem(text) {
		_classCallCheck(this, TodoItem);

		this.text = text;
		this.done = false;

		this.$element = document.createElement('li');

		this.$p = document.createElement('p');
		this.$p.innerText = this.text;
		this.$element.appendChild(this.$p);

		this.$doneButton = document.createElement('button');
		this.$doneButton.innerText = 'Done';
		this.$element.appendChild(this.$doneButton);
		this.$doneButton.addEventListener('click', this.toggleDone.bind(this));
	}

	_createClass(TodoItem, [{
		key: 'toggleDone',
		value: function toggleDone() {
			this.done = !this.done;
			this.render();
			window.dispatchEvent(new Event('itemchanged'));
		}
	}, {
		key: 'render',
		value: function render() {
			this.$doneButton.innerText = this.done ? 'Undo' : 'Done';
			this.$element.className = this.done ? 'done' : '';
			this.$p.innerText = this.text;
		}
	}]);

	return TodoItem;
}();

var todoList = new TodoList();
//# sourceMappingURL=main.js.map
