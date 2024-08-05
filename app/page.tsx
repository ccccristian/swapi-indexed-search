import { cookies } from "next/headers"
import Home from "./components/Home"
import { InitialSearchParams } from "./utils/definitions"

export default function page({searchParams} :
  {
    //Obtained from server
    searchParams: InitialSearchParams
  }) {
    //Cookie that stores the theme (dark or light)
    //Initialized again cause it cannot be passed from the layout.tsx
    const cookieStore = cookies()
    const dataTheme = cookieStore.get('data-theme')?.value ?? 'light'
    return (
        // Separated to Home component to use client component features and avoid conflict with next/headers (cookies)
        <Home searchParams={searchParams} dataTheme={dataTheme}/>
  );
}
