export const cart=[{
    Id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    Id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  }
];

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
  
      })
    }
    
  }
  