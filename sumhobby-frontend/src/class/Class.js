import React, { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import ClassDetail from "./ClassDetail";
import { call } from "../service/ApiService";
import "./Class.css";

const Class = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [classData, setClassData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await call("/class/category", "GET", null);
        if (response && response.data) {
          setClassData(response.data);
          const uniqueCategories = [...new Set(response.data.map((item) => item.classCategory))];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchClassData();
  }, []);

  const handleMenuChange = (menu) => {
    if (activeMenu === menu) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menu);
    }
    setSelectedItem(null); // Reset selected item when menu changes
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  const itemData = activeMenu
    ? classData.filter((item) => item.classCategory === activeMenu)
    : [];

  return (
    <div className="Class">
      <header className="Class-header">내 강의실</header>
      <div className="toggle-menu">
        {categories.map((category) => (
          <Button
            key={category}
            className={activeMenu === category ? "active" : ""}
            onClick={() => handleMenuChange(category)}
            color="primary"
          >
            {category}
          </Button>
        ))}
      </div>
      {activeMenu && !selectedItem && (
        <div className="class-list">
          {itemData.map((item, index) => (
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
                    src={item.classImg}
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
                    <Typography component="span" className="class-name">
                      제목:{item.className}
                    </Typography>
                  </div>
                  <div className="info-row">
                    <Typography component="span" className="instructor-name">
                      강사: {item.userId}
                    </Typography>
                  </div>
                  <div className="info-row">
                    <Typography component="span" className="rating">
                      별점: {item.classRate}
                    </Typography>
                  </div>
                  <div className="info-row">
                    <Typography component="span" className="class-intro">
                      소개: {item.classDetail}
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

export default Class;
