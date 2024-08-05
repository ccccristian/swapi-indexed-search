
//Example "luke skywalker" => "Luke skywalker"
export function capitalize(input: string){
    const capitalized =
    input.charAt(0).toUpperCase()
    + input.slice(1).toLowerCase()

    return capitalized
}

//Example "episode_id" => "episode id"
export function deleteLowLines(input: string)
{
    const newText = input.replaceAll('_', ' ')
    return newText
}

//Example "episode_id" => "Episode id"
export function clearValue(input: string){
    const capitalized = capitalize(input)

    const clearText = deleteLowLines(capitalized)

    return clearText

}