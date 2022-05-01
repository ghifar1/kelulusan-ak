import axios from "axios";

const base_url = document.querySelector("meta[property='url']").getAttribute("content");
const axios_instance = axios.create({
    baseURL: base_url,
})

export {
    base_url,
    axios_instance
}
