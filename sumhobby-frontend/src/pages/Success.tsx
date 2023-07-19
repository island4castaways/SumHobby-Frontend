import { useEffect, useState } from "react";
import React,{ useSearchParams } from "react-router-dom"
import { call } from "../service/ApiService";

export function SuccessPage() {

  const [searchParams] = useSearchParams();
  const [payment, setPayment] = useState<any[]>([]);

  useEffect(() => {
    call("/checkout/result", "POST", {orderId: searchParams.get("orderId")})
    .then((response) => setPayment(response.data));
    deleteCart();
  }, []);

  const deleteCart=() =>{
    payment.map((item) => {
      call("/cart/pay","DELETE",{classNum : item.classNum})
    })
  }

  return (
    <div>
      <h1>결제 성공</h1>
      <div>{`주문 아이디: ${searchParams.get("orderId")}`}</div>
      <div>{`결제 금액: ${Number(
        searchParams.get("amount")
      ).toLocaleString()}원`}</div>
      <div>{`결제한 강의: `}
      {payment.map((item, index) => (
        <div> 강의명: {item.className} {item.classPrice}원</div> 
      ))}
      </div>
    </div>
  )
}