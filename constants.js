var API_URL = "";
if (process.env.NODE_ENV === "development") {
    API_URL = "http://192.168.8.100:3000"
} else {
    API_URL = "h";
}

export { API_URL };