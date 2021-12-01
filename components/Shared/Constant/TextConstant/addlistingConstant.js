module.exports = {
  stock_text: (type) => {
    if (type === 1) {
      return `Stock`;
    } else {
      return `Ticket limit`;
    }
  },

  stock_card_text: (type, value) => {
    if (type === 1) {
      return `Only ${value} products in stock`;
    } else {
      return `${value} tickets left`;
    }
  },
};