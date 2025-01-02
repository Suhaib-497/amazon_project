// import {cart} from '../../data/cart.js'
import Cart from  '../../data/cart-class.js';
import { getProduct,numberOfItems } from '../../data/products.js';
import { getDeliveryOpition } from '../../data/deliveryoption.js';
import { monyFormat } from '../utilis/mony.js';


export function paymentSummary(){
  const cart=new Cart('cart');
    let totalPriceCents=0;
    let totalDeliveryOptionPrice=0;
    let numberOfItemss=0;
cart.cartItem.forEach(cartItems => {
   const product= getProduct(cartItems.Id);
   numberOfItemss+=numberOfItems(cartItems.Id);
   totalPriceCents+= product.priceCents*cartItems.quantity;
   const deliveryOptition=getDeliveryOpition(cartItems.deleveryId);
    totalDeliveryOptionPrice+= deliveryOptition.priceCents;
});

const totalBeforTaxCents=totalPriceCents+totalDeliveryOptionPrice;
const taxCents=totalBeforTaxCents*0.1;
const totalCents=+totalBeforTaxCents+taxCents;


const paymentSummaryHtml=`

     <div class="payment-summary-row">
            <div>Items (${numberOfItemss}):</div>
            <div class="payment-summary-money">$${monyFormat(totalPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${monyFormat(totalDeliveryOptionPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${monyFormat(totalBeforTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${monyFormat(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${monyFormat(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>


`


document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHtml;
}