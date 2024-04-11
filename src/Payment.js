import {useEffect, useState} from 'react';

import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'

function Payment(props) {
  const { stripePromise } = props;
  const [ clientSecret, setClientSecret ] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent")
      .then((res) => res.json())
      .then(({clientSecret}) => setClientSecret(clientSecret));
  }, []);

  const options = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
      business: "RocketRides",
    }
  };

  return (
    <>
      <h1>Payment</h1>
      {console.log(clientSecret)}
      {console.log(stripePromise)}
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret, options }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
