import Main from './Main'
import { cookies } from "next/headers"


export default function Page({ params }: { params: { id: string, category: string } }) {
  const cookieStore = cookies()
  const dataTheme = cookieStore.get('data-theme')?.value ?? 'light'

    return ( 
      <Main params={params} dataTheme={dataTheme}/>
  )
}
