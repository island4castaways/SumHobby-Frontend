import { API_BASE_URL } from "../api-config";

export function call(api, method, request) {
    let headers = new Headers(
        {"Content-Type": "application/json",}
    );

    let options = {
        headers: headers, 
        url: API_BASE_URL + api,
        method: method,
    };

    if(request) {
        options.body = JSON.stringity(request);
    }

    return fetch(options.url, options).then((response) => {
        if(response.status === 200) {
            return response.json();
        } else if(response.status === 403) {
            window.location.href = "/admin";
        } else {
            throw Error(response);
        }
    }).catch((error) => {
        console.log("http error");
        console.log(error);
    });
}

// export function signin(userDTO) {
//     return call("/auth/signin", "POST", userDTO).then((response) => {
//         if(response.token) {
//             localStorage.setItem("ACCESS_TOKEN", response.token);
//             window.location.href = "/";
//         }
//     });
// }

// export function signout() {
//     localStorage.setItem("ACCESS_TOKEN", null);
//     window.location.href = "/login";
// }

// export function signup(userDTO) {
//     return call("/auth/signup", "POST", userDTO);
// }

export function adminlogin(adminDTO) {
    return call("/admin/login", "POST", adminDTO).then((response) => {
        if(response.token) {
            localStorage.setItem("ADMIN_TOKEN", response.token);
            window.location.href = "/admin/memu";
        }
    });
};

export function adminlogout() {
    localStorage.setItem("ADMIN_TOKEN", null);
    window.location.href = "/";
};

export function adminUsers() {
    return call("/admin/users", "GET", null).then((response) => {
        if(response) {
            window.location.href = "/admin/users";
        }
    });
};

export function adminOrders() {
    return call("/admin/orders", "GET", null).then((response) => {
        if(response) {
            window.location.href = "/admin/orders";
        }
    });
};

export function adminClasses() {
    return call("/admin/classes", "GET", null).then((response) => {
        if(response) {
            window.location.href = "/admin/classes";
        }
    });
};

export function adminInquiries() {
    return call("/admin/inquiries", "GET", null).then((response) => {
        if(response) {
            window.location.href = "/admin/inquiries";
        }
    });
};