import { cookies } from "next/headers"
import Home from "./components/Home"

export default function page({searchParams} :
  {
    searchParams?:{
      query?: string,
      page?: string,
      category?: string,
      order?: string,
      orderBy?: string
    }
  }) {
    const cookieStore = cookies()
    const dataTheme = cookieStore.get('data-theme')?.value ?? 'light'
    return (
        <Home searchParams={searchParams} dataTheme={dataTheme}/>
  );
}
