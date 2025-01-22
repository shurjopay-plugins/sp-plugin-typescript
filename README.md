# ![shurjoPay](https://shurjopay.com.bd/dev/images/shurjoPay.png) TypeScript plugin package

![Made With](https://badgen.net/badge/Made%20with/typescript)
![NPM](https://img.shields.io/npm/l/sp-plugin)
![version](https://img.shields.io/badge/version-1.0.0-blue)


Official shurjoPay JavaScript package (plugin) for merchants or service providers to connect with [**_shurjoPay_**](https://shurjopay.com.bd) Payment Gateway v2.1 developed and maintained by [_**ShurjoMukhi Limited**_](https://shurjomukhi.com.bd).

This plugin package is compatible with any TypeScript or JavaScript application or framework, including React, Vue.js, Angular, Next.js, and more.
Also it makes it easy for developers to integrate with shurjoPay v2.1 with just three API calls:

1. **makePayment**: create and send payment processing request
1. **verifyPayment**: verify payment status at shurjoPay

Also reduces many of the things that you had to do manually

- Handles http request and errors
- JSON serialization and deserialization
- Authentication during checkout and verification of payments

## Audience

This document is intended for the developers and technical personnel of merchants and service providers who want to integrate the shurjoPay online payment gateway using javascript.

# How to use this shurjoPay Plugin

To integrate the shurjoPay Payment Gateway in your JavaScript project do the following tasks sequentially.

#### Step 1: Copy and paste the lib folder from the plugin into the root directory of your project environment.


#### Step 2: Copy and paste the shurjopay_config.js file from the plugin into the root directory of your project environment.


Checkout this [react project](https://github.com/shurjopay-plugins/sp-plugin-usage-examples/tree/main/next-app-typescript-plugin) to see this plugin in action.
#### Step 3: Set up the configuration parameters correctly in the shurjopay_config.js file for the shurjopay plugin within your application.

e.g. SP_ENDPOINT Url, SP_USERNAME, SP_PASSWORD, SP_PREFIX for the order id and SP_RETURN_URL.

Create a shurjopay_config.js in the project directory with text similar like below:

```javaScript
const shurjopay_config = {
    SP_ENDPOINT: "https://sandbox.shurjopayment.com",
    SP_USERNAME: "sp_sandbox",
    SP_PASSWORD: "pyyk97hu&6u6",
    SP_PREFIX: "sp",
    SP_RETURN_URL: "https://<your.app.com>/shurjopay-response",
};

export { shurjopay_config };
```
#### To initiate a payment, import and use the makePayment function as follows:

```javascript
import { makePayment } from "../lib/shurjoPay";

  const form_data = {
      prefix: "NOK",
      currency: "BDT",
      customer_name: "Md Wali Mosnad Ayshik",
      customer_phone: "01775XXXXXX",
      customer_email: "Ayshikmee@gmail.com",
      customer_address: "123 Street, Dhaka",
      customer_city: "Dhaka",
      customer_state: "Dhaka",
      customer_postcode: "1212",
      customer_country: "Bangladesh",
      shipping_address: "123 Street, Dhaka",
      shipping_city: "Dhaka",
      shipping_country: "Bangladesh",
      received_person_name: "Ayshik",
      shipping_phone_number: "017XXXXXXXX",
      amount: 100,
    };
      const merchantOrderId = `your order id`;
      const makePayment = await makePayment(merchantOrderId, form_data);
```


#### Payment verification can be done after each transaction with shurjopay order id

```javascript
const verifyPayment_details = await verifyPayment(order_id as string);
```

## References

1. [Next sample project](https://github.com/shurjopay-plugins/sp-plugin-usage-examples/tree/main/next-app-typescript-plugin) showing usage of the javascript plugin.
2. Vanilla [javascript sample project](https://github.com/shurjopay-plugins/sp-plugin-usage-examples/tree/dev/javascript-app-javascript-plugin) to get your feet wet with shurjopay.
3. [Sample applications and projects](https://github.com/shurjopay-plugins/sp-plugin-usage-examples) in many different languages and frameworks showing shurjopay integration.
4. [shurjoPay Postman site](https://documenter.getpostman.com/view/6335853/U16dS8ig) illustrating the request and response flow using the sandbox system.
5. [shurjopay Plugins](https://github.com/shurjopay-plugins) home page on github

## License

This code is under the [MIT open source License](http://www.opensource.org/licenses/mit-license.php).

#### Please [contact](https://shurjopay.com.bd/#contacts) with shurjoPay team for more detail.

Copyright ©️2022 [ShurjoMukhi Limited](https://shurjomukhi.com.bd).
