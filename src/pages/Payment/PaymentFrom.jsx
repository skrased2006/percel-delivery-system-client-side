import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';


const PaymentFrom = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate()

  const [error, setError] = useState('');

  const { data: parcelInfo = {} } = useQuery({
    queryKey: ['parcels', parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
    enabled: !!parcelId, // prevent unnecessary fetch
  });

  const amount = parcelInfo?.cost || 0;
  const amountInCents = Math.round(amount * 100);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('error', error);
      setError(error.message);
      return;
    }

    console.log('payment method', paymentMethod);

    // step 2: create payment intent
    const res = await axiosSecure.post('/create-payment-intent', {
      amountInCents,
      parcelId
    });

    const clientSecret = res.data.clientSecret;

    // step 3: confirm payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName || 'Anonymous',
          email: user?.email || 'unknown@example.com'
        }
      }
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      setError('');
      if (result.paymentIntent.status === 'succeeded') {

        const transactionId = result.paymentIntent.id;
        const paymentData = {
          parcelId,
          email: user.email,
          amount,
          transactionId: transactionId,
          paymentMethod: result.paymentIntent.payment_method_types
        }

        const paymentRes = await axiosSecure.post('payments', paymentData)
        if (paymentRes.data.insertedId) {
          console.log('payment successfully')
          await Swal.fire({
            icon: 'success',
            title: 'Payment Successful!',
            html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
            confirmButtonText: 'Go to My Parcels',
          });
          navigate('/dashBoard/myParcel');
        }


      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow mt-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-3 border rounded">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#1a202c',
                  '::placeholder': { color: '#a0aec0' },
                },
                invalid: {
                  color: '#e53e3e',
                },
              },
            }}
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={!stripe}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Pay ${amount}
        </button>
      </form>
    </div>
  );
};

export default PaymentFrom;
