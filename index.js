
      // -------------------------------Cart VanillaJS functions -------------------------------

var worldMarket = {};
worldMarket.cart = [];
//Item constructor function
worldMarket.Item = function(name, price, count) {
  this.name = name
  this.price = price
  this.count = count
};
//--------- add item to Cart addCartItem() (name, price, count)

worldMarket.addCartItem = function(name, price, count) {
  for (var i in this.cart) {
//prevent same item being considered new item
    if (this.cart[i].name === name) {
      this.cart[i].count += count;
      this.saveCartItems();
      //this.displayCart;
      return;
    }
  }
  var item = new this.Item(name, price, count);
  this.cart.push(item);
  this.displayCart();
  this.saveCartItems();
};
//---------removeCartItem (name) //remove singe Item

worldMarket.removeCartItem = function(name) {
  for(var i in this.cart) {
    if (this.cart[i].name === name) {
      this.cart[i].count--;
      if (this.cart[i].count < 1){
        this.cart.splice(i, 1);
      }
      break;
    }
  }
  this.saveCartItems();
};
//--------removeaAllCartItem()

worldMarket.removeAllCartItem = function(name) {
  for(var i in this.cart) {
    if (this.cart[i].name === name) {
      this.cart.splice(i, 1);
      break;
    }
  }
  this.saveCartItems();
  this.displayCart();
};
//------- countCartItems() //returns the total number
worldMarket.countTotalItems = function() {
  var totalCount = 0;
  for (var i in this.cart) {
    totalCount += this.cart[i].count;
  }
  return totalCount;
};
//----------- emptyCart

worldMarket.emptyCart=function() {
  this.cart = [];
  this.saveCartItems();
};
//----------- totalCartCost() // return Cost total

worldMarket.totalCartCost = function() {
  var totalPrice = 0;
  for (var i in this.cart) {
    totalPrice += this.cart[i].price * this.cart[i].count;
  }
  return totalPrice.toFixed(2);
};
//------------------ listCartItems // cart items array
worldMarket.listCartItems=function() {
  var cartCopy = [];
  for (var i in this.cart) {
    var item = this.cart[i];
    var itemCopy = {};
    for (var x in item) {
      itemCopy[x] = item[x];
    }
    itemCopy.total = (item.price * item.count).toFixed(2);
    cartCopy.push(itemCopy);
  }
  return cartCopy;
};
//------------------- saveCartItems() save cart to local Storage

worldMarket.saveCartItems=function() {
  localStorage.setItem("localCart", JSON.stringify(this.cart));
};

// findCart // find cart from local Storage
worldMarket.findCart=function() {
  this.cart = localStorage.getItem("localCart");
  this.cart = JSON.parse(this.cart);
};

worldMarket.displayCart=function() {
  var cartArray = this.listCartItems();
//  console.log(" count cart is " + cartArray.length);
  var display = "";
  for (var i in cartArray) {
    display += "<li>"
      +cartArray[i].name
      +" <input class='entry-count' type='number' data-name='"
      +cartArray[i].name
      +"' value='"+cartArray[i].count+"' >"
      +" x "+cartArray[i].price
      +" = "+cartArray[i].total
      +" <button class='subtract-single-item' data-name='"+cartArray[i].name+"'>-</button>"
      +" <button class='add-single-item' data-name='"+cartArray[i].name+"'>+</button>"
      +" <button class='delete-all-item' data-name='"+cartArray[i].name+"'>X</button>"
      +"</li>"
  }
  $("#show-cart").html(display);
  $("#item-count").html( worldMarket.countTotalItems());
  $("#total-cart").html( worldMarket.totalCartCost());
};
// --------------------------------JQuery ------------------------------------------
$(".add-to-cart").click(function(event) {
  event.preventDefault();
  var name = $(this).attr("data-name");
  var price = Number($(this).attr("data-price"));
  worldMarket.addCartItem(name, price, 1);
  worldMarket.displayCart();
  console.log(worldMarket.cart);
});



$("#show-cart").on("click", ".delete-all-item", function(event) {
  var name = $(this).attr("data-name");
  worldMarket.removeAllCartItem(name);
  worldMarket.displayCart();
});

$("#show-cart").on("click", ".subtract-single-item", function(event) {
  var name = $(this).attr("data-name");
  worldMarket.removeCartItem(name);
  worldMarket.displayCart();
});

$("#show-cart").on("click", ".add-single-item", function(event) {
  var name = $(this).attr("data-name");
  worldMarket.addCartItem(name, 0, 1);
  worldMarket.displayCart();
});

$("#show-cart").on("change", ".entry-count", function(event) {
  var name = $(this).attr("data-name");
  var count = Number($(this).val());
  worldMarket.setCartItemCount(name, count);
  worldMarket.displayCart();
});

$("#clear-cart").click(function(event){
  event.preventDefault();
  worldMarket.emptyCart();
  worldMarket.displayCart();
})

worldMarket.setCartItemCount = function(name, count) {
  for (var i in this.cart) {
    if (this.cart[i].name === name) {
      this.cart[i].count = count;
      break;
    }
  }
}
worldMarket.findCart();
worldMarket.displayCart();
