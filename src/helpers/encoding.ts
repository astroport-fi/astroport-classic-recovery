export function toBase64(obj: object) {
  return Buffer.from(JSON.stringify(obj)).toString("base64");
}
