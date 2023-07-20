import React, { useEffect, useRef, useState } from "react"
import { loadPaymentWidget, PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk"
import { nanoid } from "nanoid"

import "../App.css"
import { useLocation } from "react-router-dom"
import { call } from "../service/ApiService"

const clientKey = "test_ck_5GePWvyJnrKnv4pgnx7VgLzN97Eo"
const customerKey = "test_sk_4vZnjEJeQVxXaL051vbVPmOoBN0k"

export default function Checkout() {
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null)
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null)

  type Item = {
    orderId: string;
    add: boolean;
    cartNum: number;
    className: string;
    classNum: number;
    classPrice: number;
    userEmail: string;
    userName: string;
    userTk: string;
  };

  const location = useLocation();
  const state = location.state as {total: number, checkItems: Item[]};
  const [price, setPrice] = useState(state.total);
  const [items, setItems] = useState<Item[]>(state.checkItems || []);
  const [orderId, setOrderId] = useState("");
  

  useEffect(() => {
    setItems(state.checkItems);
  }, [])

  useEffect(() => {
    const generatedOrderId = nanoid();
    setOrderId(generatedOrderId);
  }, []);

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey)

      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        "#payment-widget",
        price
      )

      paymentWidgetRef.current = paymentWidget
      paymentMethodsWidgetRef.current = paymentMethodsWidget
    })()
  }, [])

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current

    if (paymentMethodsWidget == null) {
      return
    }

    paymentMethodsWidget.updateAmount(
      price,
      paymentMethodsWidget.UPDATE_REASON.COUPON
    )
  }, [price])

//   useEffect(() => {
//     console.log(orderId)
//     itemSetOrderId(orderId)
//   }, [orderId])

//   const cratePayment = () =>{
//     items.map((item) => {
//       console.log(items);
//       call("/checkout","POST",item)
//       .then((response) => setItems(response.data));
//     });
//   }

//   const itemSetOrderId = (orderId: string) =>{
//     console.log(orderId)
//     if (orderId) {
//       const updatedItems = items.map((item) => {
//         return {
//           ...item,
//           [orderId]: orderId,
//         };
//       });
//     setItems(updatedItems);
//     console.log(items)
//     cratePayment();
//   }
// }

  return (
    <div>
      <h1>주문서</h1>
      <div id="payment-widget" />
      <button
        onClick={async () =>{
          const paymentWidget = paymentWidgetRef.current
          try{
            items.map((item) => {
              call("/checkout","POST", { orderId: orderId, classNum: item.classNum})
            });
            await paymentWidget?.requestPayment({
            orderId: orderId,
            orderName: items[0].userTk,
            customerName: items[0].userTk,
            customerEmail: items[0].userEmail,
            successUrl: `http://localhost:1010/checkout/success`,
            failUrl: `http://localhost:1010/checkout/fail`,
            })
          }catch(err){
            console.log(err)
          }

        }}>
        결제하기
        </button>
    </div>
  )
}