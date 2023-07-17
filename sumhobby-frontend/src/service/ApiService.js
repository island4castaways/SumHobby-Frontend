import { API_BASE_URL } from "../api-config";

export function call(api,method,request){
    
    let options = {
        headers:new Headers({
            "Content-Type":"application/json",
        }),
        url:API_BASE_URL + api,
        method:method,
    };
    if(request){
        //GET method
        options.body = JSON.stringify(request);
    }
    return fetch(options.url,options).then((response)=>{
        if(response.status === 200){
            return response.json();
        }
    });
};

export function signout() {
    localStorage.setItem("ACCESS_TOKEN", null);
    window.location.href = "/login";
};

export function signup(userDTO) {
    return call("/auth/signup", "POST", userDTO);
};

export function findId(userDTO) {
    return call(`/search/id?email=${userDTO.email}`, "GET");
};

export function modify(userDTO){
    return call("/update","POST", userDTO);
};
