import Main from './Main'
import { cookies } from "next/headers"

// params is the values of the dynamic route obtainer from the server
export default function Page({ params }: { params: { id: string, category: string } }) {

  // Gets current theme to allow switch component work fine
  const cookieStore = cookies()
  const dataTheme = cookieStore.get('data-theme')?.value ?? 'light'

    return ( 
      <Main params={params} dataTheme={dataTheme}/>
  )
}
