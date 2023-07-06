let backendHost;

const hostname = window && window.location && window.location.hostname;

if(hostname === "localhost"){
    backendHost = "http://localhost:1010"
// } else {
    // backendHost = "http://prod-todo-api-service0010.ap-northeast-2.elasticbeanstalk.com";
    // backendHost = "http://app.yeonnnnn.p-e.kr"
}

export const API_BASE_URL = `${backendHost}`;