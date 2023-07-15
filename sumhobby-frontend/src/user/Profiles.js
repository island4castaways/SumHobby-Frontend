import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
// import { postApplication } from '../service/ApiService';

const ApplyInstructorForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [proposal, setProposal] = useState('');

    // 이름, 이메일, 전화번호, 제안서 입력 필드의 값이 변경될 때 호출
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setProposal(event.target.value);
    };

    // 제출 버튼을 클릭했을 때 호출되는 함수입니다.
    const handleSubmit = () => {
        // 강사신청서 정보를 객체로 생성합니다.
        const applicationData = {
            name: name,
            email: email,
            phone: phone,
            proposal: proposal,
        };

        // 백엔드로 강사신청서를 전송하는 API 호출
        // postApplication(applicationData)
            // .then(() => {
                // window.location.href = "/mypage";
            // })
            // .catch((error) => {
            //     console.error('강사신청서 제출에 실패하였습니다:', error);
            // });
    };

    return (
        <div style={{ maxWidth: 500, margin: '0 auto' }}>
            <Typography variant="h5" gutterBottom>
                강사신청서 작성
            </Typography>
            <TextField
                label="이름"
                value={name}
                onChange={handleNameChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="이메일"
                value={email}
                onChange={handleEmailChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="휴대폰 번호"
                value={phone}
                onChange={handlePhoneChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="제안서"
                value={proposal}
                onChange={handleDescriptionChange}
                multiline
                rows={4}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                제출하기
            </Button>
        </div>
    );
};

export default ApplyInstructorForm;
