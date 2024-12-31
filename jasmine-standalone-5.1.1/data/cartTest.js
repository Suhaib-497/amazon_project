import { addTOCart,cart,loadFromStorage } from "../../data/cart.js";

describe('test suit:addTOCart', ()=>{
    it('add an existing item',()=>{

        spyOn(localStorage,'setItem')
        spyOn(localStorage,'getItem').and.callFake(()=>{

            return JSON.stringify([{
                Id:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        
                quantity:1,
                deleveryId:'1',
            }]);
            
           
        })
        loadFromStorage()

        addTOCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
        expect(cart.length).toEqual(1)

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].Id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);

    });

    it('add a new item',()=>{

        spyOn(localStorage,'setItem')
        spyOn(localStorage,'getItem').and.callFake(()=>{

            return JSON.stringify([]);
            
           
        })
        loadFromStorage()

        console.log(localStorage.getItem('cart'))
        addTOCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
        expect(cart.length).toEqual(1)

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].Id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    })
})