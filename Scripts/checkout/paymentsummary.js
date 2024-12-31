import {cart} from '../../data/cart.js'
import { getProduct,numberOfItems } from '../../data/products.js';
import { getDeliveryOpition } from '../../data/deliveryoption.js';
import { monyFormat } from '../utilis/mony.js';
export function paymentSummary(){
    let totalPriceCents=0;
    let totalDeliveryOptionPrice=0;
    let numberOfItemss=0;
cart.forEach(cartItem => {
   const product= getProduct(cartItem.Id);
   numberOfItemss+=numberOfItems(cartItem.Id);
   totalPriceCents+= product.priceCents*cartItem.quantity;
   const deliveryOptition=getDeliveryOpition(cartItem.deleveryId);
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