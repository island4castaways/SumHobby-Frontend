import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";

const Class = () => {
  const [activeMenu, setActiveMenu] = useState(null); // 상태값 추가

  const handleMenuChange = (menu) => {
    if (activeMenu === menu) {
      setActiveMenu(null); // 이미 선택된 메뉴를 다시 클릭하면 메뉴 닫기
    } else {
      setActiveMenu(menu); // 선택한 메뉴 열기
    }
  };

  // activeMenu에 따라 필터링된 데이터 사용
  const activeMenuData = activeMenu
    ? itemData.filter((item) => item.menu === activeMenu)
    : [];

  return (
    <div className="Class">
      <header className="Class-header">내 강의실</header>
      <div className="toggle-menu">
        <button
          className={activeMenu === "cooking" ? "active" : ""}
          onClick={() => handleMenuChange("cooking")}
        >
          요리
        </button>
        <button
          className={activeMenu === "exercise" ? "active" : ""}
          onClick={() => handleMenuChange("exercise")}
        >
          운동
        </button>
        <button
          className={activeMenu === "crafts" ? "active" : ""}
          onClick={() => handleMenuChange("crafts")}
        >
          공예
        </button>
      </div>
      {activeMenu && (
        <div className="class-list">
          {activeMenuData.map((item, index) => (
            <Grid container spacing={2} className="class-item" key={index} marginTop={3}>
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
                      제목: {item.title}
                    </Typography>
                  </div>
                  <div className="info-row">
                    <Typography
                      component="span"
                      className="instructor-name"
                    >
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
                      내용: {item.classIntro}
                    </Typography>
                  </div>
                </div>
              </Grid>
            </Grid>
          ))}
        </div>
      )}
    </div>
  );
};

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    menu: 'cooking', // 메뉴 추가
    classIntro: '맛있겠지?',
    rating:5
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    menu: 'cooking', // 메뉴 추가
    classIntro: '와다다다',
    rating:3.5
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    menu: 'exercise', // 메뉴 추가
    classIntro:'ddfd',
    rating:2.0
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
