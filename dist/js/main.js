"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TodoList = function TodoList() {
  var _this = this;

  _classCallCheck(this, TodoList);

  _defineProperty(this, "render", function () {
    _this.items.forEach(function (item) {
      if (item.done && !_this.showCompleted) {
        item.$element.remove();
      } else {
        _this.$todoListUL.appendChild(item.$element);
      }
    });

    _this.$totalCounter.innerText = _this.items.length;
    _this.$doneCounter.innerText = _this.items.filter(function (item) {
      return item.done;
    }).length;
  });

  this.items = [];
  this.showCompleted = true;
  this.$todoListUL = document.querySelector('.todo ul');
  this.$doneCounter = document.querySelector('.todo .done');
  this.$totalCounter = document.querySelector('.todo .total');
  var $newItemElement = document.querySelector('[name="new-item"]');
  $newItemElement.addEventListener('keyup', function (event) {
    if (event.key !== 'Enter') return false;
    var newItem = new TodoItem(event.currentTarget.value); // CALLBACK technique for inter-component communication (react style)
    // let newItem = new TodoItem(event.currentTarget.value, this.render)

    _this.items.push(newItem);

    event.currentTarget.value = '';

    _this.render();
  });
  var $showCompletedCheckbox = document.querySelector('[name="show-completed"]');
  $showCompletedCheckbox.addEventListener('change', function (e) {
    _this.showCompleted = $showCompletedCheckbox.checked;

    _this.render();
  }); // EVENT technique for inter-component communication (vue style)
  // listen for change events coming from the child TodoItems

  window.addEventListener('itemchanged', this.render);
} // the render function handles putting the items in the DOM (or not). 
// everything inside each item is handled by its own render function
;

var TodoItem = function TodoItem(text
/*, parentRenderCallback*/
) {
  var _this2 = this;

  _classCallCheck(this, TodoItem);

  _defineProperty(this, "toggleDone", function () {
    _this2.done = !_this2.done;

    _this2.render(); // EVENT technique for inter-component communication (vue style)
    // dispatch and event so that parent component can know when this child component changed, so it needs to update	


    window.dispatchEvent(new Event('itemchanged')); // CALLBACK technique for inter-component communication (react style)
    // something changed in this component, and the parent component needs to know it, so we call the provided "callback" function
    // this.parentRenderCallback()
  });

  _defineProperty(this, "render", function () {
    _this2.$doneButton.innerText = _this2.done ? 'Undo' : 'Done';
    _this2.$element.className = _this2.done ? 'done' : '';
  });

  this.text = text;
  this.done = false; // CALLBACK technique for inter-component communication (react style)
  // this.parentRenderCallback = parentRenderCallback;

  this.$element = document.createElement('li');
  this.$p = document.createElement('p');
  this.$p.innerText = this.text;
  this.$element.appendChild(this.$p);
  this.$doneButton = document.createElement('button');
  this.$doneButton.innerText = 'Done';
  this.$element.appendChild(this.$doneButton);
  this.$doneButton.addEventListener('click', this.toggleDone);
};

var todoList = new TodoList();
//# sourceMappingURL=main.js.map
