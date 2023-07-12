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
  const location = useLocation();
  const amount = location.state;
  console.log(amount.total)
  const [price, setPrice] = useState(amount.total);

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
            orderId: nanoid(),
            orderName: "토스 티셔츠 외 2건",
            customerName: "이게될까",
            customerEmail: "customer123@gmail.com",
            successUrl: `http://localhost:3000/success`,
            failUrl: `http://localhost:3000/fail`,
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