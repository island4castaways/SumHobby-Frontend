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
        }
    }).catch((error) => {
        console.log("http error");
        console.log(error);
    });
}

export function signin(userDTO) {
    return call("/auth/signin", "POST", userDTO)
        .then((response) => {
            if (response.token) {
                //로컬 스토리리지에 토큰 저장
                localStorage.setItem("ACCESS_TOKEN", response.token);
                //token이 존재하는 경우 리다이렉트 나중에 홈으로 변경
                window.location.href = "/mypage";
            }
        });
}

export function signout() {
    localStorage.setItem("ACCESS_TOKEN", null);
    window.location.href = "/login";
}

export function signup(userDTO) {
    return call("/auth/signup", "POST", userDTO);
}

export function findId(userDTO) {
    return call(`/search/id?email=${userDTO.email}`, "GET");
}

export function getUserInfo() {
    return call("/getuserinfo", "GET");
}

export function modifyUserInfo(userDTO) {
    return call("/update", "POST", userDTO);
}
