import axios from "axios";

const instance=axios.create({
    // baseURL: "localhost:8000"
    baseURL: "https://task-manager-calendar.herokuapp.com"
});

export default instance;