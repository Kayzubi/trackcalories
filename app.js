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
            {id:0, name: 'Amala and Ewedu', calories: 400},
            {id:1, name: 'Rice and dodo', calories: 200},
            {id:2, name: 'Yam porridge', calories: 700}
        ],
        currentItem : null,
        totalCals : 0
    }

    return {

        getItems: function() {
            return _state.items;
        },
        logState : function() {
            return _state;
        }
    }
    })();

// UI controller
const UICtrl = (function(){ 
    const UISelectors = {
        itemList: 'item-list'
    }


    return {
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

            document.getElementById(`${UISelectors.itemList}`).innerHTML = html;
        }

    }

})();


// App controller

const App = (function(ItemCtrl, UICtrl) {


    // Methods open to the public
    return {
        init: function(){
            // Fetch items from Data sturcture
            const items = ItemCtrl.getItems();

            // Insert items to UI
            UICtrl.porpulateListItems(items);
        }
    }

})(ItemCtrl, UICtrl);

App.init()