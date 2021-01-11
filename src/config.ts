let APP_URL = "";
let API_URL = "";

// NOTE Update details of production and stage url
if (process.env.NODE_ENV === "production") {
    API_URL = "https://api-sandbox.openindoor.io";
    APP_URL = "https://app-sandbox.openindoor.io";
} else if (process.env.NODE_ENV === 'stage') {
    API_URL = "https://api-sandbox.openindoor.io";
    APP_URL = "https://app-sandbox.openindoor.io";
} else {
    API_URL = "https://api-sandbox.openindoor.io";
    APP_URL = "https://app-sandbox.openindoor.io";
}

export default {
    APP_URL,
    API_URL
}