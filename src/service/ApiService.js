import { API_BASE_URL } from "../api-config";

export function call(api, method, request) {
    let headers = new Headers({
        "Content-Type": "application/json",
    });

    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken && accessToken !== null) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };

    if (request) {
        options.body = JSON.stringify(request);
    }

    return fetch(options.url, options).then((response) => {
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 403) {
            window.location.href = "/";
        } else {
            throw response;
        }
    }).catch((error) => {
        console.log("http error");
        console.log(error);
    });
};

export function signin(userDTO) {
    if(localStorage.getItem("ACCESS_TOKEN")) {
        localStorage.removeItem("ACCESS_TOKEN");
    }
    return call("/auth/signin","POST", userDTO).then((response) => {
        if(response.token) {
            //로컬 스토리리지에 토큰 저장
            localStorage.setItem("ACCESS_TOKEN", response.token);
            //token이 존재하는 경우 리다이렉트 나중에 홈으로 변경
            window.location.href = "/mypage";
        }
    }).catch((error) => {
        alert("로그인을 실패했습니다.\n회원 정보를 다시 확인해주세요.")
    });
};

export function signout() {
    localStorage.removeItem("ACCESS_TOKEN");
    window.location.href = "/login";
};

export function signup(userDTO) {
    return call("/auth/signup", "POST", userDTO);
};

export function findId(userDTO) {
    return call(`/search/id?email=${userDTO.email}`, "GET");
}

export function getUserInfo() {
    return call("/auth/userinfo", "GET", null);
}

export function modifyUserInfo(userDTO) {
    return call("/auth/modifyuser", "PUT", userDTO);
}


export function postInquiry(inquiry) {
    return call('/inquiry/list', 'GET', inquiry);
}

export const getInquiries = () => {
    return call('/inquiry/list', 'GET', null);
};