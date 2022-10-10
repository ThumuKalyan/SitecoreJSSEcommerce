/* eslint-disable no-unused-vars */
/* global Boxever */
var _boxeverq = _boxeverq || [];
const isMobile = false
var ChannelType = isMobile ? 'MOBILE_WEB' : 'WEB';

export function loginEvent() {
  window._boxeverq.push(function () {
    var identityEvent = {
      channel: ChannelType,
      type: 'IDENTITY',
      language: 'EN',
      currency: 'INR',
      page: 'login',
      pos: 'JSSEcommerce',
      browser_id: Boxever.getID(),
      email: 'kalyant@techaspect.com',
    };
    // Invoke event create
    // (<event msg>, <callback function>, <format>)

    window.Boxever.eventCreate(identityEvent, function (data) {}, 'json');
  });
}

export function logoutEvent() {
  window._boxeverq.push(function () {
    var viewEvent = {
      type: 'FORCE_CLOSE',
      browser_id: window._boxever.getID(),
      channel: ChannelType,
      page: window.location.href,
      pos: 'JSSEcommerce',
      _bx_extended_message: '1',
    };
    window._boxever.eventCreate(viewEvent, function (data) {}, 'json');
  });
}

export function sendAddEvent(
  productType,
  itemId,
  productCurrency,
  productQuantity,
  productPrice,
  productID,
  productName
) {
  // Place an anonymous function in the Boxever queue
  window._boxeverq.push(function () {
    var addEvent = {
      channel: ChannelType,
      type: 'ADD',
      language: 'EN',
      currency: 'INR',
      page: 'checkout',
      pos: 'JSSEcommerce',
      browser_id: window.Boxever.getID(),
      product: {
        type: productType,
        item_id: "item"+itemId,
        currency: productCurrency,
        price: productPrice,
        quantity: productQuantity,
        product_id: productID,
        name: productName,
      },
    };
    // Invoke event create
    // (<event msg>, <callback function>, <format>)
    window.Boxever.eventCreate(addEvent, function (data) {}, 'json');
  });
}

export function sendConfirmEvent(confirmedProducts) {
  console.log(confirmedProducts);
  // Place an anonymous function in the Boxever queue
  window._boxeverq.push(function () {
    var confirmEvent = {
      channel: ChannelType,
      type: 'CONFIRM',
      language: 'EN',
      currency: 'INR',
      page: 'checkout',
      pos: 'JSSEcommerce',
      browser_id: window.Boxever.getID(),
      product: confirmedProducts,
    };
    // Invoke event create
    // (<event msg>, <callback function>, <format>)
    window.Boxever.eventCreate(confirmEvent, function (data) {}, 'json');
  });
}

export function sentCheckoutEvent() {
  // Place an anonymous function in the Boxever queue
  window._boxeverq.push(function () {
    var checkoutEvent = {
      channel: ChannelType,
      type: 'CHECKOUT',
      language: 'EN',
      currency: 'INR',
      page: 'checkout',
      pos: 'JSSEcommerce',
      browser_id: window.Boxever.getID(),
      reference_id: 'ORDER_' + Math.floor(Math.random() * 1000),
      status: 'PURCHASED',
    };
    // Invoke event create
    // (<event msg>, <callback function>, <format>)
    window.Boxever.eventCreate(checkoutEvent, function (data) {}, 'json');
  });
}
