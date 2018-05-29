"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The master todo list controller
 * Keeps all the items in an array, and updates the DOM as needed
 * 
 */
var TodoList = function TodoList() {
  _classCallCheck(this, TodoList);
};

var $todoUL = document.querySelector(".todo ul");

/**
 * One todo list item
 * Keeps track of it's own state (text, done, etc)
 * Updates it's own internal DOM as needed
 */

var TodoItem = function TodoItem(text) {

  // $todoUL.appendChild( ... )

  _classCallCheck(this, TodoItem);
};

var todoList = new TodoList();
var todoItem1 = new TodoItem("Milk");
var todoItem2 = new TodoItem("Eggs");
var todoItem3 = new TodoItem("Diapers");
//# sourceMappingURL=main.js.map
