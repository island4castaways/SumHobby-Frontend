import React, { useState } from 'react';
import { Container, Typography, Button, Checkbox } from '@mui/material';
import { CheckBox } from '@mui/icons-material';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const addItem = () => {
    // 임의의 항목 데이터 생성 (이 부분은 실제 데이터로 대체해야 합니다)
    const item = {
      add: true,
      name: '상품명',
      price: 10000,
      image: '상품이미지URL',
    };

    // 장바구니 항목 배열에 추가
    setCartItems([...cartItems, item]);
  };

  const removeItem = () => {
    // 장바구니 항목 배열에서 마지막 항목 제거
    setCartItems(cartItems.slice(0, -1));
  };

  return (
    <Container sx={{ marginTop: '40px', textAlign: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        장바구니
      </Typography>
      <div>
        {cartItems.length === 0 ? (
          <Typography variant="body1">장바구니에 항목이 없습니다.</Typography>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <input type="checkbox" value={item.add}/>
              <img src={item.image} alt={item.name} sx={{ width: '50px', height: '50px', marginRight: '10px' }} />
              <Typography variant="body1">{item.name}</Typography>
            </div>
          ))
        )}
      </div>
      <div sx={{ marginTop: '20px' }}>
        <Button variant="contained" onClick={addItem} sx={{ marginRight: '10px' }}>
          항목 추가
        </Button>
        <Button variant="contained" color="error" onClick={removeItem} disabled={cartItems.length === 0}>
          항목 제거
        </Button>
      </div>
    </Container>
  );
};

export default Cart;