/**
 * Next.js Typescript plugin class to connect and integrate with the shurjoPay payment gateway API.
 * 
 * This plugin includes three mandatory functions for interacting with shurjoPay:
 * 1. `authenticate()` - Authenticates the client with shurjoPay.
 * 2. `makePayment()` - Generates the payment URL for checkout.
 * 3. `verifyPayment()` - Verifies the payment status.
 * 
 * 
 * @author Md Wali Mosnad Ayshik
 * Senior Software Engineer
 * @since 22/01/2025
 */


import { shurjopay_config } from "../shurjopay_config";

// Static error messages
const MSG_AUTH_FAILED = "Merchant authentication failure";
const MSG_PAYMENT_FAILED = "Payment processing failed";
const MSG_PAYMENT_VERIFY_FAILED = "Payment verification failed";

// Type definitions for improved TypeScript support
interface PaymentRequest {
  amount: number;
  prefix: string;
  currency: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  customer_address: string;
  customer_city: string;
  customer_state: string;
  customer_postcode: string;
  customer_country: string;
  shipping_address: string;
  shipping_city: string;
  shipping_country: string;
  received_person_name: string;
  shipping_phone_number: string;
  discount_amount?: number;
  disc_percent?: number;
  value1?: string;
  value2?: string;
  value3?: string;
  value4?: string;
}

interface PaymentResponse {
  checkout_url: string;
  order_id: string;
  status: string;
  [key: string]: any; // Allow additional properties if returned by the API
}

/**
 * Authenticates with shurjoPay and returns the token.
 */
async function authenticate(): Promise<any> {
  try {
    const response = await fetch(`${shurjopay_config.SP_ENDPOINT}/api/get_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: shurjopay_config.SP_USERNAME,
        password: shurjopay_config.SP_PASSWORD,
      }),
    });

    if (!response.ok) throw new Error(MSG_AUTH_FAILED);
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message); // Throw an Error instance with its message
    }
    throw new Error(MSG_AUTH_FAILED);
  }
}

/**
 * Processes a payment request to shurjoPay.
 */
async function makePayment(
  merchant_order_id: string,
  form_data: PaymentRequest
): Promise<PaymentResponse | string> {
  try {
    const ipResponse = await fetch("https://checkip.amazonaws.com/");
    const client_ip = (await ipResponse.text()).trim();

    const tokenDetails = await authenticate();
    const { token, token_type, store_id } = tokenDetails;

    const payload = {
      ...form_data,
      store_id,
      token,
      client_ip,
      return_url: shurjopay_config.SP_RETURN_URL,
      cancel_url: shurjopay_config.SP_RETURN_URL,
      order_id: merchant_order_id,
    };

    const response = await fetch(
      `${shurjopay_config.SP_ENDPOINT}/api/secret-pay`,
      {
        method: "POST",
        headers: {
          authorization: `${token_type} ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) throw new Error(MSG_PAYMENT_FAILED);
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      return error.message; // Return the error message if it's an instance of Error
    } else {
      return MSG_PAYMENT_FAILED; // Fallback message for unknown errors
    }
  }
}

/**
 * Verifies the payment status using shurjoPay's order ID.
 */
async function verifyPayment(sp_order_id: string): Promise<any> {
  if (!sp_order_id) return "Missing order ID";

  try {
    const tokenDetails = await authenticate();
    const { token, token_type } = tokenDetails;

    const response = await fetch(
      `${shurjopay_config.SP_ENDPOINT}/api/verification`,
      {
        method: "POST",
        headers: {
          authorization: `${token_type} ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order_id: sp_order_id }),
      }
    );

    if (!response.ok) throw new Error(MSG_PAYMENT_VERIFY_FAILED);
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      return error.message; // Return the error message if it's an instance of Error
    } else {
      return MSG_PAYMENT_VERIFY_FAILED; // Fallback message for unknown errors
    }
  }
}

// Export functions
export { makePayment, verifyPayment, authenticate };
