
// Used to clean sql query params
export default function escapeString(str: string) {
  return str
    .replace(/\\/g, '\\\\') // Replace \ with \\
    .replace(/'/g, "\\'")   // Replace ' with \'
    .replace(/"/g, '\\"')   // Replace " with \"
    .replace(/\n/g, '\\n')  // Replace new line with \n
    .replace(/\r/g, '\\r')  // Replace carriage return with \r
    .replace(/\x00/g, '\\0')// Replace NULL byte with \0
    .replace(/\x1a/g, '\\Z');// Replace EOF with \Z
}