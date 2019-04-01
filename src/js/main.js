class TodoList {
	constructor() {
		this.items = [];
		this.showCompleted = true;
		
		this.$todoListUL = document.querySelector('.todo ul')
		this.$doneCounter = document.querySelector('.todo .done')
		this.$totalCounter = document.querySelector('.todo .total')
		
		let $newItemElement = document.querySelector('[name="new-item"]');
		$newItemElement.addEventListener('keyup', (event) => {
			if (event.key !== 'Enter') return false;
			this.items.push( new TodoItem(event.currentTarget.value) );
			event.currentTarget.value = '';
			this.render()
		})

		let $showCompletedCheckbox = document.querySelector('[name="show-completed"]');
		$showCompletedCheckbox.addEventListener('change', (e) => {
			this.showCompleted = $showCompletedCheckbox.checked;
			this.render()
		})

		window.addEventListener('itemchanged', this.render.bind(this))
		this.render()
	}

	// the render function handles putting the items in the DOM. 
	// everything inside each item is handled by its own render function
	render() {
		console.log('TodoList::render()')
		this.items.forEach((item) => {
			if (item.done && !this.showCompleted) {
				item.$element.remove()
			} else {
				this.$todoListUL.appendChild(item.$element)
			}
		})
		this.$totalCounter.innerText = this.items.length;
		this.$doneCounter.innerText = this.items.filter((item) => item.done).length;
	}
}



class TodoItem {
	constructor(text) {

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
	
	toggleDone() {
		this.done = !this.done;
		this.render();
		window.dispatchEvent(new Event('itemchanged'))
	}

	render() {
		this.$doneButton.innerText = this.done ? 'Undo' : 'Done';
		this.$element.className = this.done ? 'done' : '';
		this.$p.innerText = this.text;
	}
}


let todoList = new TodoList();