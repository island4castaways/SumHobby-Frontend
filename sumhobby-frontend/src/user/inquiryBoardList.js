import Header from './Header';
import React, { useEffect, useState } from "react";
import CategoryFilter from "./CategoryFilter";

import "./FAQ.css";


const qnaList = [
    {
        category: "category1",
        question: "테스트입니다",
        answer: "답변입니다.",
    },
    {
        category: "category2",
        question: "what is that ? 2",
        answer: "this is react. 2",
    },
    {
        category: "category3",
        question: "what is that ? 3",
        answer: "this is react. 3",
    },
    {
        category: "category1",
        question: "what is that ? 4",
        answer: "this is react. 4",
    },
    {
        category: "category2",
        question: "what is that ? 5",
        answer: "this is react. 5",
    },
    {
        category: "category3",
        question: "what is that ? 6",
        answer: "this is react. 6",
    },
];

const BoardList = () => {
    const [category, setCatecory] = useState("all");
    const [cardOnOff, setCardOnOff] = useState(qnaList);
    const [showList, setShowList] = useState(qnaList);

    const getQnACard = (item, index) => {
        return (
            <div className="faq-card" key={index}>
                <div
                    className="faq-card-title"
                    onClick={() => {
                        let tempCard = cardOnOff;
                        tempCard[index].show = !tempCard[index].show;
                        setCardOnOff([...tempCard]);
                    }}
                >
                    <span className="question-mark">Q.</span>
                    <span>{item.question}</span>
                </div>
                <div
                    className={
                        qnaList[index].show
                            ? "faq-card-answer"
                            : "faq-card-answer faq-card-none"
                    }
                >
                    <span className="answer-mark">A.</span>
                    <span className="FAQ-card-answer">{item.answer}</span>
                </div>
            </div>
        );
    };

    useEffect(() => {
        setShowList(
            qnaList.filter((item) => {
                if (category === "all") return true;
                if (category === item.category) return true;
                return false;
            })
        );
    }, [category]);

    return (

        <div>
            <Header />
            <h1>FAQ</h1>
            <div className="fqa-parent">
                <div className="faq-list">
                    {showList.map((item, index) => getQnACard(item, index))}
                </div>
            </div>
        </div>

    );
};

export default BoardList;