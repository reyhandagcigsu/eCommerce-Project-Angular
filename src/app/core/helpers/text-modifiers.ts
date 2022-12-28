import { Cart } from 'src/app/shared/models/cart.model';

export function characterEditor(text: string) {
  return text?.replace(/'/g, '').replace(/ /g, '-');
}

export function findOcc(carts, ourKey) {
  let arr: Cart[] = [];
  carts.forEach((cart) => {
    if (
      arr.some((val) => {
        return val[ourKey] === cart[ourKey];
      })
    ) {
      arr.forEach((k) => {
        if (k[ourKey] === cart[ourKey]) {
          k.quantity++;
        }
      });
    } else {
      let a: Cart = {
        key: cart.key,
        product: cart.product,
        productId: cart.produtctId,
        quantity: cart.quantity,
      };
      a[ourKey] = cart[ourKey];
      arr.push(a);
    }
  });
  return arr;
}

export function countItems(arr) {
  let quantityArr = [];
  arr.forEach((cart) => {
    quantityArr.push(cart.quantity);
  });
  let totalQuantity = quantityArr.reduce((acc, curr) => acc + curr, 0);
  return totalQuantity;
}

export function calculateTotalPrice(arr) {
  let priceArr = [];
  arr.forEach((cart) => {
    priceArr.push(cart.quantity * cart.product.price);
  });
  let totalPrice = priceArr.reduce((acc, curr) => acc + curr, 0);
  totalPrice = Math.round(totalPrice * 100) / 100;
  return totalPrice;
}
