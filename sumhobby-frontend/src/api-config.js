let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
    backendHost = "http://localhost:1010";
}
//1010으로 변경
export const API_BASE_URL = `${backendHost}`