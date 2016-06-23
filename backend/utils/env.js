export const getEnvVar = (key) => {
  if (!process.env[key]) throw Error(`${key} is a required environment variable`)
  return process.env[key]
}
