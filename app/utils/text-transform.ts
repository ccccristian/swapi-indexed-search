

export function capitalize(input: string){
    const capitalized =
    input.charAt(0).toUpperCase()
    + input.slice(1).toLowerCase()

    return capitalized
}

export function deleteLowLines(input: string)
{
    const newText = input.replaceAll('_', ' ')
    return newText
}

export function clearValue(input: string){
    const capitalized = capitalize(input)

    const clearText = deleteLowLines(capitalized)

    return clearText

}