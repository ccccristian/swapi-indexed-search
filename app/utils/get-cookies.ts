'use server'
import { cookies } from "next/headers";

export async function getCookie(name: string){
    const cookieStore = cookies()
    const data = cookieStore.get(name)

    return data
}

export async function setCookie(name:string, newVal:string){
    const cookieStore = cookies()
    cookieStore.set(name, newVal)
    return newVal
}