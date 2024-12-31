import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
import { monyFormat } from '../utilis/mony.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions,getDeliveryOpition } from '../../data/deliveryoption.js';
import {paymentSummary} from './paymentsummary.js'
const today = dayjs();

export function renderSummaryOrder() {
  let checkOutHtml = '';
  let numberOfItems = 0;

  cart.forEach((item) => {
    const productId = item.Id;
    const matchingitem = getProduct(productId);

    if (matchingitem) {
      numberOfItems++;
    }

    const deliveryoptionId = item.deleveryId;
    const deliveryoption = getDeliveryOpition(deliveryoptionId)

    const deliveryDay = today.add(deliveryoption.deliverytime, 'days');
    const dateString = deliveryDay.format('dddd, MMMM D');

    checkOutHtml += `
      <div class="cart-item-container js-cart-item-container-${matchingitem.id}">
        <div class="delivery-date">
          ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingitem.image}">
          <div class="cart-item-details">
            <div class="product-name">${matchingitem.name}</div>
            <div class="product-price">${monyFormat(matchingitem.priceCents)}</div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${item.quantity}</span>
              </span>
              <span class="update-quantity-link js-update-quantity-link link-primary" data-product-id=${matchingitem.id}>
                Update
              </span>
              <span class="delete-quantity-link js-delete-quantity-link link-primary" data-product-id=${matchingitem.id}>
                Delete
              </span>
            </div>
          </div>
          <div class="delivery-options js-delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>
            ${deliveryoptionHtml(matchingitem, item)}
          </div>
        </div>
      </div>`;
  });

  document.querySelector('.js-order-summary').innerHTML = checkOutHtml;
  document.querySelector('.js-items').innerHTML = numberOfItems;

  attachEventListeners();
}

function deliveryoptionHtml(matchingitem, cartitem) {
  let html = '';

  deliveryOptions.forEach((deliveryoption) => {
    const deliveryDay = today.add(deliveryoption.deliverytime, 'days');
    const dateString = deliveryDay.format('dddd, MMMM D');
    const price = deliveryoption.priceCents === 0 ? 'free shipping' : `$${monyFormat(deliveryoption.priceCents)}`;
    const isChecked = deliveryoption.id === cartitem.deleveryId;

    html += `
      <div class="delivery-option js-delivery-option"
           data-product-id=${matchingitem.id}
           data-delivery-option-id=${deliveryoption.id}>
        <input type="radio" ${isChecked ? 'checked' : ''}
               class="delivery-option-input"
               name="delivery-option-${matchingitem.id}">
        <div>
          <div class="delivery-option-date">${dateString}</div>
          <div class="delivery-option-price">${price}</div>
        </div>
      </div>`;
  });

  return html;
}

function attachEventListeners() {
  document.querySelectorAll('.js-delete-quantity-link').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();

      renderSummaryOrder();
      paymentSummary();
    });
  });

  document.querySelectorAll('.js-update-quantity-link').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      console.log(`Update quantity for product ID: ${productId}`);
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderSummaryOrder();
      paymentSummary();
    });
  });
}

renderSummaryOrder();
