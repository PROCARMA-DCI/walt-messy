import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Stripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

type CheckoutCardProps = {
  clientSecret: string;
  selectedProduct: any;
  invoiceNo: string;
  transactionID: string;
  close: () => void;
  stripePromise: Promise<Stripe | null> | null;
};

const CheckoutCard = ({
  clientSecret,
  selectedProduct,
  invoiceNo,
  transactionID,
  stripePromise,
  close,
}: CheckoutCardProps) => {
  const CheckoutForm = ({
    clientSecret,
    selectedProduct,
    invoiceNo,
    transactionID,
    onSuccess,
  }: any) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!stripe || !elements) return;

      setLoading(true);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            // @ts-ignore
            card: elements.getElement(CardNumberElement),
          },
        }
      );

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }
      if (paymentIntent.status === "succeeded") {
        // await savePayment(paymentIntent);
        toast.success("Payment Successful");
        onSuccess?.();
      }

      setLoading(false);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border rounded-lg p-3">
          <CardNumberElement />
        </div>

        <div className="flex gap-3">
          <div className="flex-1 border rounded-lg p-3">
            <CardExpiryElement />
          </div>
          <div className="flex-1 border rounded-lg p-3">
            <CardCvcElement />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1f25cb] hover:bg-[#1a20a8]"
        >
          {loading ? "Processing..." : `Pay $${selectedProduct?.list_price}`}
        </Button>
      </form>
    );
  };
  return (
    <div className="w-full">
      {/* <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative">
       */}
      <div className="w-full flex justify-end items-end">
        <Button onClick={close} variant={"secondary"}>
          Back
        </Button>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-1">Card Payment</h2>
      <p className="text-sm text-gray-500 mb-6">
        Enter your credit or debit card details
      </p>
      {stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm
            clientSecret={clientSecret}
            selectedProduct={selectedProduct}
            invoiceNo={invoiceNo}
            transactionID={transactionID}
            onSuccess={close}
          />
        </Elements>
      )}
      {/* </div>
    </div> */}
    </div>
  );
};

export default CheckoutCard;
