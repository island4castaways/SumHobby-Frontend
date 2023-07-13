import React, { useEffect, useRef, useState } from "react"
import { loadPaymentWidget, PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk"
import { nanoid } from "nanoid"

import "../App.css"
import { useLocation } from "react-router-dom"
import { call } from "../service/ApiService"
import { SuccessPage } from "./Success.tsx"

const clientKey = "test_ck_5GePWvyJnrKnv4pgnx7VgLzN97Eo"
const customerKey = "test_sk_4vZnjEJeQVxXaL051vbVPmOoBN0k"

export default function Checkout() {
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null)
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null)

  type Item = {
    add: boolean;
    cartNum: number;
    className: string;
    classNum: number;
    classPrice: number;
    userEmail: string;
    userName: string;
    userTk: string;
    orderId: string;
  };

  const location = useLocation();
  const state = location.state as {total: number, checkItems: Item[]};
  const [price, setPrice] = useState(state.total);
  const [items, setItems] = useState<Item[]>(state.checkItems || []);

  useEffect(() => {
    setItems(state.checkItems);
  }, [])

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

  
  const createOrderId = () => {
    const orderId = nanoid();
    const updatedItems = items.map((item) => {
      return {
        ...item,
        orderId: orderId,
      };
    });
    setItems(updatedItems);

    items.map((item) =>{
      call("/checkout","POST",item)
    })
    return orderId;
  };


  return (
    <div>
      <h1>주문서</h1>
      <div id="payment-widget" />
      <div>
        <input
          type="checkbox"
          onChange={(event) => {
            setPrice(event.target.checked ? price - 5_000 : price + 5_000)
          }}
        />
        <label>5,000원 할인 쿠폰 적용</label>
      </div>
      <button
        onClick={async () =>{
          const paymentWidget = paymentWidgetRef.current
          try{
            await paymentWidget?.requestPayment({
            orderId: createOrderId(),
            orderName: items[0].className,
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