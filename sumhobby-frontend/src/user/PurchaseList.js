import React from "react";
// import productImage1 from "./productImage1.jpg";
// import productImage2 from "./productImage2.jpg";
import "./Board.css";

function Product() {
    const products = [
        {
            id: 1,
            title: "상품 제목 1",
            description: "상품 내용 요약 1",
            price: "15,000￦",
            //   imageSrc: productImage1,
        },
        {
            id: 2,
            title: "상품 제목 2",
            description: "상품 내용 요약 2",
            price: "20,000￦",
            //   imageSrc: productImage2,
        },
        // 다른 상품들 추가 가능
    ];

    return (
        <div>
            <h2>내 구매 목록</h2>
            <div className="product_container">
                {products.map((product) => (
                    <div className="product" key={product.id}>
                        <div className="product_img_div">
                            <img src={product.imageSrc} className="product_img" alt="상품 이미지" />
                        </div>
                        <h5 className="product_title">{product.title}</h5>
                        <p className="product_des">{product.description}</p>
                        <div className="product_mon">금액: {product.price}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Product;