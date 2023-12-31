import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Checkbox,
  Paper,
  List,
  ListItem,
  IconButton,
  ListItemSecondaryAction,
} from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import { call } from './service/ApiService';
import { useNavigate } from 'react-router-dom';
const cartImageBase64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQE...';

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [checkItems, setCheckItems] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if(!accessToken) {
      alert("로그인이 필요합니다.");
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    call("/cart","GET",null)
    .then((response) => setCartItems(response.data));

  }, []);

  const deleteItem = (item) => {
    call("/cart","DELETE",item)
    .then((response) => setCartItems(response.data));
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
        return sum + item.classPrice;
      }
      return sum;
    }, 0);

    setCartItems(updatedCartItems);
    setTotal(newTotalPrice);
  };

  const goCheckout = () => {
    if(total == 0){
      alert("0원은 결제할 수 없습니다.")
    }else{
      const checkedItems = cartItems.filter((item) => item.add);
    setCheckItems(checkedItems);
    
    setTimeout(() => {
      navigateCheck(checkedItems);
    }, 0);
    }
    // const checkedItems = cartItems.filter((item) => item.add);
    // setCheckItems(checkedItems);
    
    // setTimeout(() => {
    //   navigateCheck(checkedItems);
    // }, 0);
  };
  
  const navigateCheck = (items) => {
    console.log(items);
    navigate('/checkout', {
      state: {
        total: total,
        checkItems: items,
      },
    });
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
                      src={"/img/cartimg3.png"}
                      alt={item.className}
                      style={{ width: '150px', height: '150px', marginRight: '10px' }}
                    />
                    <Typography variant="body1">강의명:{item.className}&nbsp;&nbsp;&nbsp;</Typography>
                    <Typography variant="body1">가격:{item.classPrice}</Typography>
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
        
      </div>
      <div>
        Total: {total}
        <Button onClick={goCheckout}>결제하기</Button>
      </div>
    </Container>
  );
};

export default Cart;