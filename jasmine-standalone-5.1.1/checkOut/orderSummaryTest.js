import { loadFromStorage } from '../../data/cart.js';
import {renderSummaryOrder} from '../../Scripts/checkout/ordersummary.js';

describe('test suit:renderSummaryOrder', ()=>{

    it('display the cart',()=>{
        document.querySelector('.js-test-container').innerHTML=`

        <div class="js-order-summary"></div>
        <div class="js-items"></div>
        <div class="js-payment-summary"></div>
        `;


         spyOn(localStorage,'getItem').and.callFake(()=>{

            return JSON.stringify([{
                Id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deleveryId:'1',
              },
              {
                Id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deleveryId:'2',
              }
            ]);
            
           
        });
        loadFromStorage();
        renderSummaryOrder();
    })
})