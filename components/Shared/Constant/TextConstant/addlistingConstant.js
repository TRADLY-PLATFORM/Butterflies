module.exports = {
  stock_text: (type) => {
    if (type === 1) {
      return `Stock`;
    } else if (type === 2) {
      return `Ticket limit`;
    } else {
      return `Stock`;
    }
  },

  stock_card_text: (type, value) => {
    if (type === 1) {
      return `Only ${value} products in stock`;
    } else if (type === 2) {
      return `${value} tickets left`;
    } else {
      return `Only ${value} listings in stock`;
    }
  },
};
