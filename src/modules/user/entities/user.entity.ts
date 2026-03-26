export class user {
    id: number
    name: string
    lastname: string
    username: string
    hash?:string | null |undefined
    password?: string
    refreshToken?: string | null
    created_at?: Date
}