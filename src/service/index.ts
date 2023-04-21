import MRequest from "./request"
import { BASE_URL, TIME_OUT } from "./config"

const Request = new MRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export { Request }
