import axios from "axios";
import { useParams } from "react-router-dom";

export default function Payment(){
    let id = useParams();
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
      const result = await axios.post("http://localhost:4000/orders");
          
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
          image: "data:image/jpeg;base64,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",
          order_id: order_id,
          handler: async function (response) {
              const data = {
                  orderCreationId: order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpaySignature: response.razorpay_signature,
              };
    
              const result = await axios.post("http://localhost:5000/payment/success", data);
    
              alert(result.data.msg);
          },
          prefill: {
              name: "Soumya Dey",
              email: "SoumyaDey@example.com",
              contact: "9999999999",
          },
          notes: {
              address: "Soumya Dey Corporate Office",
          },
          theme: {
              color: "#61dafb",
          },
      };
    
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
    let i = 0;
    
    return(
        <div>
            <button onClick={()=>displayRazorpay()} className="border-4 border-sky-300 p-2 m-2">Pay</button>
        </div>
    )
}