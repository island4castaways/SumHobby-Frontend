import { Container } from "@mui/system";
import { useParams } from "react-router-dom";

const DisplayId = () => {
    const { id } = useParams(); // 파라미터로 전달된 아이디 가져오기

    return (
        <Container>
            <Typography variant="h5">아이디 확인</Typography>
            <Typography variant="body2">ID: {id} 님 반갑습니다.</Typography>
        </Container>
    );
};

export default DisplayId;
