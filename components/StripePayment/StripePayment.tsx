import { cn } from "@/lib/utils";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useState } from "react";
import { toast } from "sonner";
import { LoaderOne } from "../ui/loader";
import CheckoutCard from "./CheckoutCard";

interface StripePaymentProps {
  selectedProduct: Record<string, any>;
  openPaymentModal: boolean;
  setOpenPaymentModal: (value: boolean) => void;
  setThankYou: (value: Record<string, any> | null) => void;
}
const StripePayment = ({
  selectedProduct,
  openPaymentModal,
  setOpenPaymentModal,
  setThankYou,
}: StripePaymentProps) => {
  const [clientSecret, setClientSecret] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [transactionID, setTransactionID] = useState("");
  const [loading, setLoading] = useState(false);
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);

  const handlePurchasePlan = async () => {
    const payload_metadata = {
      clientSecret,
      product_id: selectedProduct.product_id,
      product_saving: selectedProduct.product_saving,
      no_of_installment: selectedProduct.payment_month,
      total_amount: selectedProduct.list_price,
      PaymentThrough: 1, // CARD
      monthly_payment: selectedProduct.monthly_price,
      invoice_no: invoiceNo,
      TransactionID: transactionID,
      TransactionPercentage: selectedProduct.TransactionPercentage,
      payment_type: selectedProduct.payment_type,
    };
    setLoading(true);
    const API_URL =
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_DEV_API_SERVER_HOST
        : process.env.NEXT_PUBLIC_PROD_API_SERVER_HOST;
    const response = await fetch(`${API_URL}/config`);

    const payload = {
      amount: Math.round(Number(selectedProduct.list_price) * 100), // cents

      // OPTIONAL but recommended
      metadata: {
        ...payload_metadata,
      },
    };
    const key = await response.json();
    const res = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res?.ok) {
      setLoading(false);
      const data = await res.json();
      setClientSecret(data.clientSecret);
      setInvoiceNo(data?.invoice_no);
      setTransactionID(data?.TransactionID);
      setStripePromise(loadStripe(key.publishableKey));
    } else {
      toast.error("Something went wrong, Server Error");
    }
  };

  return (
    <>
      {!openPaymentModal ? (
        <div
          className={cn(
            " w-full bg-[#1f25cb] h-[47.44px] rounded-[10.414px] cursor-pointer hover:bg-[#1a20a8] transition-colors shadow-lg flex items-center justify-center mt-4",
            loading && "opacity-70 cursor-not-allowed m-0 p-0 "
          )}
          onClick={async () => {
            if (loading) return;
            await handlePurchasePlan(); // creates PaymentIntent
            setOpenPaymentModal(true); // open popup
          }}
        >
          <p className="font-bold text-[16.199px] text-white">
            {loading ? <LoaderOne /> : "Purchase Plan"}
          </p>
        </div>
      ) : (
        clientSecret && (
          <CheckoutCard
            close={() => setOpenPaymentModal(false)}
            clientSecret={clientSecret}
            selectedProduct={selectedProduct}
            invoiceNo={invoiceNo}
            transactionID={transactionID}
            stripePromise={stripePromise}
            setThankYou={setThankYou}
          />
        )
      )}
    </>
  );
};

export default StripePayment;
