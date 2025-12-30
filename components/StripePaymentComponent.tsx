import { Button } from "@/components/ui/button";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe, Stripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

// Product Summary Component
const ProductSummary = ({ products }: { products: any[] }) => {
  const calculateTotal = () => {
    return products
      .reduce((sum, product) => {
        return (
          sum + Number(product.product_amount) + Number(product.product_saving)
        );
      }, 0)
      .toFixed(2);
  };

  return (
    <div className="w-full mb-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
        <div className="bg-gray-50 p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Your Selected Products
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {products.map((product) => (
            <div
              key={product.productId}
              className="p-4 flex items-start hover:bg-gray-50 transition-colors"
            >
              <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border border-gray-200 bg-white">
                {product.details.icon ? (
                  <img
                    src={product.details.icon}
                    alt={product.productTitle}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="ml-4 flex-grow">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-900">
                    {product.productTitle}
                  </h3>
                  <div className="font-medium text-gray-900">
                    $
                    {product.productType === "vsc"
                      ? parseFloat(product.price).toFixed(2)
                      : parseFloat(product.details.product_price).toFixed(2)}
                  </div>
                </div>
                <div
                  className="mt-1 text-sm text-gray-500 line-clamp-2"
                  dangerouslySetInnerHTML={{
                    __html: product.details.product_desc
                      ? product.details.product_desc
                          .replace(/<\/?[^>]+(>|$)/g, " ")
                          .substring(0, 120) + "..."
                      : "",
                  }}
                />
                <div className="mt-2 flex justify-between items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                    {product.productType}
                  </span>
                  {product.details.product_discount &&
                    parseFloat(product.details.product_discount) > 0 && (
                      <span className="text-sm font-medium text-green-600">
                        {product.details.product_discount}% discount
                      </span>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-gray-600 text-sm">Subtotal</span>
              <p className="text-lg font-semibold text-gray-900">
                ${calculateTotal()}
              </p>
            </div>
            <div className="text-right">
              <span className="text-gray-600 text-sm">
                {products.length} item{products.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Checkout Form Component
const CheckoutForm = ({
  clientSecret,
  products,
}: {
  clientSecret: string;
  products: any[];
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);

  // Setting up card element styles to match the design
  const cardElementStyle = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
        iconColor: "#666",
      },
      invalid: {
        color: "#9e2146",
        iconColor: "#9e2146",
      },
    },
  };

  const calculateTotal = () => {
    return products
      .reduce((sum, product) => {
        return (
          sum + Number(product.product_amount) + Number(product.product_saving)
        );
      }, 0)
      .toFixed(2);
  };

  // Log the client secret for debugging
  useEffect(() => {
    if (!stripe) return;
    console.log("Client secret received in CheckoutForm:", clientSecret);
  }, [stripe, clientSecret]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsLoading(true);

    try {
      // Validate client secret
      if (!clientSecret || !clientSecret.includes("_secret_")) {
        setMessage(
          "Invalid payment configuration. Please refresh and try again."
        );
        console.error("Invalid client secret format:", clientSecret);
        setIsLoading(false);
        return;
      }

      console.log("Using client secret:", clientSecret);

      // Create a payment method using the card elements
      const cardElement = elements.getElement(CardNumberElement);
      if (!cardElement) {
        setMessage(
          "Payment form not properly loaded. Please refresh and try again."
        );
        setIsLoading(false);
        return;
      }

      const cardHolderNameInput = document.getElementById(
        "card-holder-name"
      ) as HTMLInputElement;
      const { error: paymentMethodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            name: cardHolderNameInput?.value || "",
          },
        });

      if (paymentMethodError) {
        setMessage(
          paymentMethodError.message ||
            "An error occurred with your payment method"
        );
        setIsLoading(false);
        return;
      }

      // Confirm the payment with the created payment method
      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

      if (confirmError) {
        // Show error to your customer
        setMessage(confirmError.message || "An unexpected error occurred.");
        toast.warning("Payment Failed", {
          description:
            confirmError.message || "Something went wrong with your payment",
        });
      } else if (paymentIntent && paymentIntent.status === "requires_action") {
        // Handle 3D Secure authentication if needed
        const { error, paymentIntent: updatedIntent } =
          await stripe.confirmCardPayment(clientSecret);

        if (error) {
          setMessage(error.message || "Authentication failed");
        } else if (updatedIntent && updatedIntent.status === "succeeded") {
          setMessage("Payment successful!");
          toast.success("Success", {
            description: "Payment completed successfully",
          });
          // Redirect to completion page with product data
          const productIds = products.map((p: any) => p.productId).join(",");
          window.location.href = `${window.location.origin}/completion?products=${productIds}`;
        }
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // Payment succeeded immediately
        setMessage("Payment successful!");
        toast.success("Success", {
          description: "Payment completed successfully",
        });
        // Redirect to completion page with product data
        const productIds = products.map((p: any) => p.productId).join(",");
        window.location.href = `${window.location.origin}/completion?products=${productIds}`;
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      setMessage(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto gap-1 items-center px-4">
      <div className="flex items-center justify-center text-2xl md:text-xl font-light mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Complete Your Purchase
        </h1>
      </div>
      <div className="flex flex-col w-full items-center gap-6 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50 rounded-lg">
            <div className="flex flex-col items-center p-4 rounded-lg">
              <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
              <p className="mt-2 text-gray-700 font-medium">
                Processing payment...
              </p>
            </div>
          </div>
        )}

        {/* Display product summary */}
        {/* <ProductSummary products={products} /> */}

        <div className="w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
          <div className="bg-gray-50 p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Payment Details
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter your card information to complete the purchase
            </p>
          </div>

          <div className="p-6">
            <form id="payment-form" onSubmit={handleSubmit}>
              {/* Custom payment form fields similar to screenshot */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Card Number
                </label>
                <div className="border rounded-md p-3 flex items-center bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                  <CardNumberElement
                    options={cardElementStyle}
                    className="w-full"
                  />
                  <div className="ml-2">
                    <svg
                      width="40"
                      height="25"
                      viewBox="0 0 40 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="39"
                        height="24"
                        rx="3.5"
                        stroke="#D1D5DB"
                      />
                      <line
                        x1="8"
                        y1="12.5"
                        x2="32"
                        y2="12.5"
                        stroke="#D1D5DB"
                        strokeWidth="2"
                      />
                      <line
                        x1="8"
                        y1="16.5"
                        x2="20"
                        y2="16.5"
                        stroke="#D1D5DB"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Name on Card
                </label>
                <input
                  id="card-holder-name"
                  type="text"
                  className="w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Name on Card"
                />
              </div>

              <div className="flex flex-col mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Card Details
                </label>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <div className="border rounded-md p-3 bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                      <label className="block text-gray-500 text-xs mb-1">
                        Expiration Date
                      </label>
                      <CardExpiryElement options={cardElementStyle} />
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="border rounded-md p-3 bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                      <label className="block text-gray-500 text-xs mb-1">
                        Security Code (CVC)
                      </label>
                      <CardCvcElement options={cardElementStyle} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col mt-8">
                <Button
                  disabled={isLoading || !stripe || !elements}
                  type="submit"
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg rounded-md transition-colors"
                >
                  {isLoading ? "Processing..." : `Pay $${calculateTotal()}`}
                </Button>

                <div className="flex justify-center mt-4">
                  <Image
                    src="/powered-by.svg"
                    width={120}
                    height={30}
                    alt="Powered by Stripe"
                    className="opacity-80"
                  />
                </div>
              </div>

              {/* Show any error or success messages */}
              {message && (
                <div
                  id="payment-message"
                  className="mt-4 p-3 text-sm font-medium text-center rounded-md bg-gray-50 border border-gray-200"
                >
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stripe Payment Component Props Interface
interface StripePaymentComponentProps {
  products: any[];
  onPaymentSuccess?: (productIds: string[]) => void;
  onPaymentError?: (error: string) => void;
}

// Main Stripe Payment Component
function StripePaymentComponent({
  products,
  onPaymentSuccess,
  onPaymentError,
}: StripePaymentComponentProps) {
  const [clientSecret, setClientSecret] = useState("");
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [loading, setLoading] = useState(true);

  // Calculate total amount from products (price - discount)
  const calculateTotalAmount = () => {
    if (!products || !products.length) return 0;

    return products.reduce((total, product) => {
      // For VSC products, use the price directly from the product
      if (product.productType === "vsc") {
        const price = parseFloat(product.price || "0");
        return isNaN(price) ? total : total + price;
      } else {
        // For other products, calculate with discount
        const price = parseFloat(product.details.product_price) || 0;
        const discount = parseFloat(product.details.product_discount) || 0;
        const discountedPrice = price - (price * discount) / 100;
        return total + discountedPrice;
      }
    }, 0);
  };

  useEffect(() => {
    // First, load the Stripe publishable key
    const loadStripeConfig = async () => {
      try {
        const API_URL =
          process.env.NODE_ENV === "development"
            ? process.env.NEXT_PUBLIC_DEV_API_SERVER_HOST
            : process.env.NEXT_PUBLIC_PROD_API_SERVER_HOST;

        const response = await fetch(`${API_URL}/config`);
        const { publishableKey } = await response.json();
        setStripePromise(loadStripe(publishableKey));
        return API_URL;
      } catch (error) {
        console.log("Error fetching Stripe config:", error);
        toast.error("Error", {
          description: "Could not load payment provider configuration",
        });
        setLoading(false);
        if (onPaymentError) {
          onPaymentError("Could not load payment provider configuration");
        }
        return null;
      }
    };

    // Then create the payment intent with product information
    const createPaymentIntent = async (apiUrl: string | null) => {
      if (!apiUrl) {
        setLoading(false);
        return;
      }

      try {
        // Convert products to the format expected by the backend
        const totalAmount = calculateTotalAmount();
        const amountInCents = Math.round(totalAmount * 100); // Convert to cents for Stripe

        // Prepare product data for the backend
        const items = products.map((product) => {
          // For VSC products, use the price directly
          if (product.productType === "vsc") {
            const price = parseFloat(product.price || "0");
            const amount = isNaN(price) ? 0 : Math.round(price * 100);

            return {
              id: product.productId,
              title: product.productTitle,
              type: product.productType,
              amount: amount,
              // Include all VSC details
              vscDetails: {
                plantype: product.details.plantype,
                scPlanDescription: product.details.scPlanDescription,
                uniqueId: product.details.uniqueId,
                pdf_url: product.details.pdf_url,
                plansdetail: product.details.plansdetail,
                name: product.details.Name,
              },
            };
          } else {
            // For other products, calculate with discount
            return {
              id: product.productId,
              title: product.productTitle,
              type: product.productType,
              amount: Math.round(
                (parseFloat(product.details.product_price) -
                  (parseFloat(product.details.product_price) *
                    parseFloat(product.details.product_discount)) /
                    100) *
                  100
              ),
            };
          }
        });

        console.log(
          "Sending payment intent with amount:",
          amountInCents,
          "cents"
        );
        console.log("Product items:", items);

        const response = await fetch(`${apiUrl}/create-payment-intent`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amountInCents,
            items: items,
            metadata: {
              products: products.map((p) => p.productId).join(","),
            },
          }),
        });

        if (!response.ok) {
          throw new Error(
            `Payment server responded with status: ${response.status}`
          );
        }

        const { clientSecret } = await response.json();

        if (!clientSecret) {
          throw new Error("No client secret received from payment server");
        }

        console.log("Received client secret:", clientSecret);
        setClientSecret(clientSecret);
      } catch (error: any) {
        console.error("Error creating payment intent:", error);
        toast.error("Payment Error", {
          description: "Could not initialize payment. Please try again later.",
        });
        if (onPaymentError) {
          onPaymentError(error.message || "Could not initialize payment");
        }
      } finally {
        setLoading(false);
      }
    };

    const initialize = async () => {
      const apiUrl = await loadStripeConfig();
      await createPaymentIntent(apiUrl);
    };

    if (products && products.length > 0) {
      initialize();
    }
  }, [products]);

  // Appearance for Stripe elements
  const appearance: StripeElementsOptions["appearance"] = {
    theme: "flat",
    variables: {
      colorPrimary: "#2563eb", // Updated to a blue color
      colorBackground: "#ffffff",
      colorText: "#333",
      colorDanger: "#ef4444",
      fontFamily: "system-ui, -apple-system, sans-serif",
      spacingUnit: "4px",
      borderRadius: "6px",
    },
    rules: {
      ".Input": {
        borderColor: "#E5E7EB",
        boxShadow: "none",
      },
      ".Input:focus": {
        borderColor: "#3b82f6",
        boxShadow: "0 0 0 1px #3b82f6",
      },
      ".Label": {
        fontWeight: "500",
        color: "#4B5563",
      },
    },
  };

  return (
    <div className="py-8 px-4 bg-gray-50 min-h-screen">
      {clientSecret && stripePromise && products ? (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance,
            loader: "auto",
          }}
        >
          <CheckoutForm clientSecret={clientSecret} products={products} />
        </Elements>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-md w-full max-w-4xl mx-auto">
          {loading ? (
            <>
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
              <p className="mt-4 text-lg text-gray-700">
                Preparing your checkout...
              </p>
              <p className="mt-2 text-sm text-gray-500">
                This may take a few moments.
              </p>
            </>
          ) : (
            <>
              <div className="text-red-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Payment System Error
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Please try again, there is an issue with the payment server.
              </p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Try Again
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default StripePaymentComponent;
export { CheckoutForm, ProductSummary };
