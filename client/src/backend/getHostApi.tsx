let HOST: any;

if (process.env.NODE_ENV === "development") {
  HOST = process.env.REACT_APP_API_SERVER_URL;
} else if (process.env.NODE_ENV === "production") {
  HOST = process.env.REACT_APP_API_SERVER_URL_PROD;
}

export { HOST };
