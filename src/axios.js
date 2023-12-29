import axios from "axios";

const instance = axios.create({
  // THE API (cloud function) URL
  //baseURL: "http://localhost:5001/challenge-db28b/us-central1/api",
  baseURL: "https://us-central1-challenge-db28b.cloudfunctions.net/api", 
 
});

export default instance;


