'use server'

export async function getRandomNumber(max: number)
{
    return Math.floor(Math.random() * max)
}