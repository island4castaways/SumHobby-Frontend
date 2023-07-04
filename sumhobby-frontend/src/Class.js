import React, { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import ClassDetail from "./ClassDetail";
import "./Class.css";

const Class = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [classData, setClassData] = useState([]);

  // const fetchClassData = async () => {
  //   try{
  //     const response = await fetch("/classes");
  //     const data = await response.json();
      
  //     setClassData(data);
  //   }catch(error){
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchClassData();
  // },[]);

  const handleMenuChange = (menu) => {
    if (activeMenu === menu) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menu);
    }
    setSelectedItem(null); // 메뉴 변경 시 선택한 아이템 초기화
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  const itemData = activeMenu
    ? classData.filter((item) => item.menu === activeMenu)
    : [];

  return (
    <div className="Class">
      <header className="Class-header">내 강의실</header>
      <div className="toggle-menu">
        <Button
          className={activeMenu === "cooking" ? "active" : ""}
          onClick={() => handleMenuChange("cooking")}
          color="primary"
        >
          요리
        </Button>
        <Button
          className={activeMenu === "exercise" ? "active" : ""}
          onClick={() => handleMenuChange("exercise")}
        >
          운동
        </Button>
        <Button
          className={activeMenu === "crafts" ? "active" : ""}
          onClick={() => handleMenuChange("crafts")}
        >
          공예
        </Button>
      </div>
      {activeMenu && !selectedItem && (
        <div className="class-list">
          {classData
          .filter((item) => item.menu === activeMenu)
          .map((item, index) => (
            <Grid
              container
              spacing={2}
              className="class-item"
              key={index}
              marginTop={3}
              onClick={() => handleItemSelect(item)}
            >
              <Grid item xs={6}>
                <div className="image-container">
                  <img
                    src={item.img}
                    className="class-thumbnail"
                    alt="Thumbnail"
                    width={300}
                    height={150}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="info-container">
                  <div className="info-row">
                    <Typography component="span" className="lecture-name">
                      {item.title}
                    </Typography>
                  </div>
                  <div className="info-row">
                    <Typography component="span" className="instructor-name">
                      강사: {item.instructorName}
                    </Typography>
                  </div>
                  <div className="info-row">
                    <Typography component="span" className="rating">
                      별점: {item.rating}
                    </Typography>
                  </div>
                  <div className="info-row">
                    <Typography component="span" className="class-intro">
                      소개: {item.classIntro}
                    </Typography>
                  </div>
                </div>
              </Grid>
            </Grid>
          ))}
        </div>
      )}
      {selectedItem && <ClassDetail item={selectedItem} />}
    </div>
  );
};


const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '햄버거 만들기',
    menu: 'cooking', // 메뉴 추가
    classIntro: '맛있겠지?',
    rating:5,
    instructorName:'김나유'
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    menu: 'cooking', // 메뉴 추가
    classIntro: '와다다다',
    rating:3.5,
    instructorName:'이연복'
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    menu: 'exercise', // 메뉴 추가
    classIntro:'ddfd',
    rating:2.0,
    instructorName:'김계란'
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    menu: 'crafts', // 메뉴 추가
    classIntro:'이건 공예 영역이다',
    rating:4.5
  }
];

export default Class;
