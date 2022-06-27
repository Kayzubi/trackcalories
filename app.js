// Local storage controller


// Item controller
 const ItemCtrl = (function() {

    // Item constructor
    const Item = function(id, name, calories){
        this.id =id;
        this.name = name;
        this.calories = calories;
    }

    // Data Structure /State
    const _state = {
        items : [
            // {id:0, name: 'Amala and Ewedu', calories: 400},
            // {id:1, name: 'Rice and dodo', calories: 200},
            // {id:2, name: 'Yam porridge', calories: 700}
        ],
        currentItem : null,
        totalCals : 0
    }

    return {

        getItems: function() {
            return _state.items;
        },
        addItem: function(name, calories){
            let ID;
            // Generate an ID
            if(_state.items.length > 0){
                ID = _state.items[_state.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Parse calories to number
            calories = parseInt(calories);

            // Create new Item
            newItem = new Item(ID, name, calories);

            // Add to _state array
            _state.items.push(newItem);

            return newItem;
            
        },
        getItemById: function(id){
            let found = null;

            // Check for matching id
            _state.items.forEach(function(item){
                if(item.id === id){
                    found = item;
                }
            })
            return found;
        },
        updateItem: function(name, calories){
            // parse calories to number
            calories = parseInt(calories);

            // Match updated item to current item in data structure
            let found = null;

            _state.items.forEach(function(item){
                if(item.id === _state.currentItem.id){
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            })

            return found;
        },
        setCurrentItem: function(item){
            _state.currentItem = item;
        },
        getCurrentItem: function(){
            return _state.currentItem;
        },
        getTotalCalories: function(){
            let total = 0;

            // Add calories of all items
            _state.items.forEach(function(item){
                total = total + item.calories;
            })

            // Set totalCals in State/Data structure
            _state.totalCals = total;

            // Return total Calories
            return _state.totalCals;
        },

        logState : function() {
            return _state;
        }
    }
    })();

// UI controller
const UICtrl = (function(){ 
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
    }


    return {
        // Add items to UI
        porpulateListItems: function(items){
            let html = '';
            
            items.forEach(function(item){
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                  <i class="fa fa-pencil"></i>
                </a>
              </li>`
            });

            document.querySelector(`${UISelectors.itemList}`).innerHTML = html;
        },
        getItemInput: function(){
            return {
                name:document.querySelector(UISelectors.itemNameInput).value,
                calories:document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function(item){
            // Show item list
            document.querySelector(UISelectors.itemList).style.display = 'block';
            // Create an li element
            const li = document.createElement('li');
            // Add li class
            li.className = 'collection-item';
            // Add li ID
            li.id = `item-${item.id}`;
            // Add markup 
            li.innerHTML =`<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>`

            // Add li to itemlist
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },
        updateListItem: function(item){
            let listItems = document.querySelectorAll()
        },
        clearInputFields: function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        editItem: function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        clearEditState: function(){
            UICtrl.clearInputFields();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState: function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        getSelectors: function(){
            return UISelectors;
        }

    }

})();


// App controller

const App = (function(ItemCtrl, UICtrl) {
    //Load event listeners
    const loadEventListeners = function(){
        // Get UI selectors
        const UISelectors = UICtrl.getSelectors();

        

        // Add item submit
        const itemAddSubmit = function(e){
            //Get inputs on form from UI controller
            const input = UICtrl.getItemInput();

            // Check for empty inputs
            if(input.name !== '' && input.calories !== ''){
                //Add item
                const newItem = ItemCtrl.addItem(input.name, input.calories);

                //Add Item to UI
                UICtrl.addListItem(newItem);

                 // Get the total calories
                 const totalCalories = ItemCtrl.getTotalCalories();

                // Show total Calories
                 UICtrl.showTotalCalories(totalCalories);

                // Clear input fields
                UICtrl.clearInputFields();
            }
            
            e.preventDefault();
        }

        


        // Item update click
        const itemEditClick = function(e){
            // Target edit button
            if(e.target.classList.contains('edit-item')){
                // Get id of list item
                const listItemId = e.target.parentNode.parentNode.id;

                //Get number from id using split
                const listItemArr = listItemId.split('-');

                const id = parseInt(listItemArr[1]);

                // Get item
                const itemToEdit = ItemCtrl.getItemById(id);

                // Set item to current item
                ItemCtrl.setCurrentItem(itemToEdit)

                // Bring Up current Item
                UICtrl.editItem()
                
            }

        }

        // Update Item even
        const itemUpdateSubmit = function(e){
            
            // Get input from fields
            const input = UICtrl.getItemInput();

            // Update item
            const updatedItem =ItemCtrl.updateItem(input.name, input.calories);

            // Update UI with updated item
            UICtrl.updateListItem(updatedItem);

            e.preventDefault();
        }

        //Add item event 
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        //Disable Submit on Enter
        document.addEventListener('keypress', function(e){
            if(e.key === 'Enter'){
                e.preventDefault();
                return false;
            }
        })

        // Update item event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

        // Submit Update item
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
    }

    // Methods open to the public
    return {
        init: function(){
            // Clear Edit state
            UICtrl.clearEditState();

            // Fetch items from Data sturcture
            const items = ItemCtrl.getItems();

            // Check if Items are present
            if(items.length === 0){
                UICtrl.hideList();
            } else {
                 // Insert items to UI
                 UICtrl.porpulateListItems(items);
            }

            // Get the total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            // Show total Calories
            UICtrl.showTotalCalories(totalCalories);

            //Load event listeners
            loadEventListeners();
        }

    }

})(ItemCtrl, UICtrl);

App.init()