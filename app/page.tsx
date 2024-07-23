import { cookies } from "next/headers"
import Home from "./components/Home"
import { Montserrat } from "next/font/google";

const mainFont = Montserrat({ subsets: ["latin"] });

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
      <body data-theme={dataTheme} className={mainFont.className}>
        <Home searchParams={searchParams} dataTheme={dataTheme}/>
      </body>
  );
}
