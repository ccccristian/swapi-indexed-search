'use client'
export default function Error({error}: {
    error: Error
})
{
    return(
        <body>
            <h1>{error.name}</h1>
            <p>{error.message}</p>
        </body>
    )
}