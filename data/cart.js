export let cart=JSON.parse(localStorage.getItem('cart'));

if(!cart){
cart= [{
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


function saveCart()
{
  localStorage.setItem('cart',JSON.stringify(cart));
}
export function addTOCart(productId,quantity){
    let matchingitem;
   
  
    cart.forEach((item)=>{
      if(item.Id==productId){
        matchingitem= item;
      }
   
    });

  
    if(matchingitem){
      matchingitem.quantity+=quantity;
    }else{
      cart.push({
        Id:productId,
        
        quantity:quantity,
        deleveryId:'1',
  
      })
    }
    saveCart();
    
  }


  export function removeFromCart(productId){
    const newCart=[];
    cart.forEach((item)=>{
      if(item.Id!==productId){
        newCart.push(item);
      }
    })

    cart=newCart;

    saveCart();
  }


  export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingitem = null;
  console.log(productId);
  console.log(deliveryOptionId)
    cart.forEach((item) => {
      if (item.Id === productId) {
        matchingitem = item;
      }
    });
  
    if (matchingitem) {
      matchingitem.deleveryId = deliveryOptionId;
      saveCart();
    } else {
      console.error(`Item with productId ${productId} not found in the cart.`);
    }
  }
  