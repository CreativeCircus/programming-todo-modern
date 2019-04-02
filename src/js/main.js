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
			
			let newItem = new TodoItem(event.currentTarget.value)
			// CALLBACK technique for inter-component communication (react style)
			// let newItem = new TodoItem(event.currentTarget.value, this.render)

			this.items.push( newItem );
			event.currentTarget.value = '';
			this.render()
		}) 

		let $showCompletedCheckbox = document.querySelector('[name="show-completed"]');
		$showCompletedCheckbox.addEventListener('change', (e) => {
			this.showCompleted = $showCompletedCheckbox.checked;
			this.render()
		})

		// EVENT technique for inter-component communication (vue style)
		// listen for change events coming from the child TodoItems
		window.addEventListener('itemchanged', this.render)

	}

	// the render function handles putting the items in the DOM (or not). 
	// everything inside each item is handled by its own render function
	render = () => {
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
	constructor(text/*, parentRenderCallback*/) {

		this.text = text;
		this.done = false;
		
		// CALLBACK technique for inter-component communication (react style)
		// this.parentRenderCallback = parentRenderCallback;

		this.$element = document.createElement('li');
		
		this.$p = document.createElement('p');
		this.$p.innerText = this.text;
		this.$element.appendChild(this.$p);
		
		this.$doneButton = document.createElement('button');
		this.$doneButton.innerText = 'Done';
		this.$element.appendChild(this.$doneButton);
		this.$doneButton.addEventListener('click', this.toggleDone);

	}
	
	toggleDone = () => {
		this.done = !this.done;
		this.render();

		// EVENT technique for inter-component communication (vue style)
		// dispatch and event so that parent component can know when this child component changed, so it needs to update	
		window.dispatchEvent(new Event('itemchanged'))
		
		// CALLBACK technique for inter-component communication (react style)
		// something changed in this component, and the parent component needs to know it, so we call the provided "callback" function
		// this.parentRenderCallback()
	}

	// the render function handles the DOM representation of this item's data.
	render = () => {
		this.$doneButton.innerText = this.done ? 'Undo' : 'Done';
		this.$element.className = this.done ? 'done' : '';
	}
}


let todoList = new TodoList();