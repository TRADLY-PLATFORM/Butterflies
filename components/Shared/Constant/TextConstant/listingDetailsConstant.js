// export const variant_title = (type) => {
//   if (type === 1) {
//     return 'Select Variant';
//   } else {
//     return 'Select Ticket';
//   }
// };

module.exports = {
    stock_text: (type, value) => {
        if (type === 1) {
          return  `Only ${value} products in stock`;
        } else {
          return `${value} tickets left`;
        }
    },
  variant_title: (type) => {
    if (type === 1) {
      return 'Select Variant';
    } else {
      return 'Select Ticket';
    }
    },
    variant_stock_text: (type, value) => {
        if (type === 1) {
          return  `${value} products in stock`;
        } else {
          return `${value} tickets left`;
        }
    }
};
