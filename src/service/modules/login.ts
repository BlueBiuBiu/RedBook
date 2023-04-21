import { Request } from ".."

interface loginParams {
  phone: string
  password: string
}

// 项目列表
export function getUserInfo({ phone, password }: loginParams) {
  return Request.get<any>({
    url: "/user/login",
    params: {
      name: phone,
      pwd: password
    }
  })
}
