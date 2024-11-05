// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    fullname: string | null
  }
  interface Session {
    user: User & {
      fullname: string
    }
    token:{
        fullname: string
    }
  }
}
