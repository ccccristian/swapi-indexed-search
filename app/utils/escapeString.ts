
export default function escapeString(str: string) {
  return str
    .replace(/\\/g, '\\\\') // Reemplaza \ con \\
    .replace(/'/g, "\\'")   // Reemplaza ' con \'
    .replace(/"/g, '\\"')   // Reemplaza " con \"
    .replace(/\n/g, '\\n')  // Reemplaza nueva línea con \n
    .replace(/\r/g, '\\r')  // Reemplaza retorno de carro con \r
    .replace(/\x00/g, '\\0')// Reemplaza NULL byte con \0
    .replace(/\x1a/g, '\\Z');// Reemplaza EOF con \Z
}