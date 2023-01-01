import axios from "axios";
import { useParams } from "react-router-dom";
import { serverUrl } from "./App";

export default function Payment() {
  let { id } = useParams();
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const result = await axios.post(`${serverUrl}/orders/${id}`);

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_qtaW6Uk2obHljz", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "HelpDesk.in",
      description: "Test Transaction",
      image:
        "data:image/png;base64,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",
      order_id: order_id,
      handler: async function (response) {        
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        await axios.post(
          `${serverUrl}/success`,
          data
        ).then(response => alert(JSON.stringify(response)))
      },
      prefill: {
        name: "HelpDesk",
        email: "helpdesk@gmail.com",
        contact: "9999999999",
      },
      notes: {
        address: "HelpDesk.in Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div>
      {id === "1" ? (
        <div className="bg-slate-200 m-2 p-2 rounded-lg border-2 border-black">
            <h1 className="text-xl font-semibold">Selected Plan of ₹ 1,200/year</h1>
            <p><span className="font-semibold text-lg">Benefits:</span> Simplified collaboration and process automation functionalities for fast-growing teams.</p>
        </div>
      ) : (
        <div className="bg-slate-200 m-2 p-2 rounded-lg border-2 border-black">
            <h1 className="text-xl font-semibold">Selected plan of ₹ 2,200/year</h1>
            <p><span className="font-semibold text-lg">Benefits:</span> Advanced AI and customization capabilities to enable enterprise-grade support.</p>
        </div>
      )}

      <button
        onClick={() => displayRazorpay()}
        className="border-4 border-sky-300 bg-slate-300 hover:text-white rounded-lg hover:bg-sky-400 p-2 m-2"
      >
        Pay
      </button>
    </div>
  );
}
