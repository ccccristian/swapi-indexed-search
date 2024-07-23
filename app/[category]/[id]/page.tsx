import { Montserrat } from 'next/font/google';
import Main from './Main'
import { cookies } from "next/headers"


const mainFont = Montserrat({ subsets: ["latin"] });


export default function Page({ params }: { params: { id: string, category: string } }) {
  const cookieStore = cookies()
  const dataTheme = cookieStore.get('data-theme')?.value ?? 'light'

    return ( 
      <body data-theme={dataTheme} className={mainFont.className}>
          <Main params={params} dataTheme={dataTheme}/>
      </body>
  )
}
