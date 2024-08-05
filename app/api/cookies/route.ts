import { cookies } from "next/headers";
import { NextRequest, NextResponse } from 'next/server';

//App route to save cookies
export async function POST(req: NextRequest) {
  // Destructuring request
  const { name, newVal } = await req.json();

  //Cookie library pre-installed in next
  const cookieStore = cookies()

  //Saving cookie
  cookieStore.set(name, newVal);

  //Response to the request
  const response = NextResponse.json({ success: true, newVal: newVal })
  return response;
}