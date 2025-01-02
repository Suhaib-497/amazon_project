function Cart(localStorageKey){

const cart={
     cartItem:undefined,

     loadFromStorage(){
        this.cartItem=JSON.parse(localStorage.getItem(localStorageKey));
      
        if(!this.cartItem){
        this.cartItem= [{
            Id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deleveryId:'1',
          },
          {
            Id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deleveryId:'2',
          }
        ];
        
        }
      },

 saveCart(){
  localStorage.setItem(localStorageKey,JSON.stringify(this.cartItem));
},


 addTOCart(productId,quantity){
    let matchingitem;
   
  
    this.cartItem.forEach((item)=>{
      if(item.Id==productId){
        matchingitem= item;
      }
   
    });

  
    if(matchingitem){
      matchingitem.quantity+=quantity;
    }else{
        this.cartItem.push({
        Id:productId,
        
        quantity:quantity,
        deleveryId:'1',
  
      })
    }
    this.saveCart();
    
  },

   removeFromCart(productId){
    const newCart=[];
    this.cartItem.forEach((item)=>{
      if(item.Id!==productId){
        newCart.push(item);
      }
    })

    this.cartItem=newCart;

    this.saveCart();
  },

   updateDeliveryOption(productId, deliveryOptionId) {
    let matchingitem = null;
  
    this.cartItem.forEach((item) => {
      if (item.Id === productId) {
        matchingitem = item;
      }
    });
  
    if (matchingitem) {
      matchingitem.deleveryId = deliveryOptionId;
      this.saveCart();
    } else {
      console.error(`Item with productId ${productId} not found in the cart.`);
    }
  }




}
return cart;
}

const cart=Cart('cart-oop');
const bussnisCart=Cart('bussnis-cart');

cart.loadFromStorage();
bussnisCart.loadFromStorage();
console.log(cart)
console.log(bussnisCart)





  


  
  