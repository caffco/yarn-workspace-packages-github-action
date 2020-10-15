import fs from 'fs'

export const readJsonFile = async (
  pathToFile: string
): Promise<Record<string, unknown>> => {
  const buffer = await new Promise<Buffer>((resolve, reject) =>
    fs.readFile(pathToFile, (error, data) =>
      error ? reject(error) : resolve(data)
    )
  )

  return JSON.parse(buffer.toString())
}
