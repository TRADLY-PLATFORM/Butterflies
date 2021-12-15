 
module.exports = {
  account_follow_notification_text: (name) => {
    return `${name} following your account`;
  },
  listing_like_notification_text: (name) => {
    return `${name} liked your listing`;
  },
  account_order_notification_text: (status) => {
    return ` Order is ${orderStatus(Number(status))} `;
  },
  order_notification_text: (status) => {
    return ` Your order is ${orderStatus(Number(status))} `;
  },
};

export const orderStatus = (id) => {
  if (id === 1) {
    return 'incomplete';
  }
  if (id === 2) {
    return 'confirmed';
  }
  if (id === 3) {
    return 'in progress';
  }
  if (id === 4) {
    return 'shipped';
  }
  if (id === 5) {
    return 'customer unreachable';
  }
  if (id === 6) {
    return 'out for delivery';
  }
  if (id === 7) {
    return 'returned';
  }
  if (id === 8) {
    return ' return confirmed';
  }
  if (id === 9) {
    return 'delivered';
  }
  if (id === 10) {
    return 'delivery confirmed';
  }
  if (id === 11) {
    return 'return initiated';
  }
  if (id === 12) {
    return 'return picked';
  }
  if (id === 13) {
    return 'return confirmed';
  }
  if (id === 14) {
    return 'return disputed';
  }
  if (id === 15) {
    return 'canceled by seller ';
  }
  if (id === 16) {
    return 'canceled by customer';
  }
  if (id === 17) {
    return 'ready for pickup';
  }
};
