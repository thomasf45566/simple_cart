import React from 'react';

const Checkout = ({ total }) => (
  <div>
    {console.log(total)}
    Total: {total}
    <br></br>
    <button>Checkout</button>
  </div>
);

export default Checkout;