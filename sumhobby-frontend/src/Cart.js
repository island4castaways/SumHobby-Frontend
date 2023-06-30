import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Checkbox,
  Paper,
  List,
  ListItem,
  IconButton,
  ListItemSecondaryAction
} from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const addItem = () => {
    // 임의의 항목 데이터 생성 (이 부분은 실제 데이터로 대체해야 합니다)
    const newItem = {
      add: false,
      name: '상품명',
      price: 30000,
      image: '상품이미지URL'
    };

    // 장바구니 항목 배열에 추가
    setCartItems([...cartItems, newItem]);
  };

  const removeItem = () => {
    // 장바구니 항목 배열에서 마지막 항목 제거
    setCartItems(cartItems.slice(0, -1));
  };

  const deleteItem = (item) => {
    // 삭제할 아이템을 찾는다.
    const newItems = cartItems.filter((e) => e !== item);
    // 삭제할 아이템을 제외한 아이템을 다시 배열에 저장한다.
    setCartItems([...newItems]);
  };

  const handleCheckboxChange = (index) => {
    const updatedCartItems = cartItems.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          add: !item.add
        };
      }
      return item;
    });

    const newTotalPrice = updatedCartItems.reduce((sum, item) => {
      if (item.add) {
        return sum + item.price;
      }
      return sum;
    }, 0);

    setCartItems(updatedCartItems);
    setTotal(newTotalPrice);
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
          <Paper>
            <List>
              {cartItems.map((item, index) => (
                <ListItem key={index}>
                  <Checkbox checked={item.add} onChange={() => handleCheckboxChange(index)} />
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '50px', height: '50px', marginRight: '10px' }}
                    />
                    <Typography variant="body1">{item.name}</Typography>
                    <Typography variant="body1">{item.price}</Typography>
                  </div>
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Delete Todo" onClick={() => deleteItem(item)}>
                      <DeleteOutlined />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </div>
      <div style={{ marginTop: '20px' }}>
        <Button variant="contained" onClick={addItem} style={{ marginRight: '10px' }}>
          항목 추가
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={removeItem}
          disabled={cartItems.length === 0}
        >
          항목 제거
        </Button>
      </div>
      <div>
        Total: {total}
        <Button>결제하기</Button>
      </div>
    </Container>
  );
};

export default Cart;