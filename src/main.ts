import path from 'node:path'
import { readJsonFile } from './fs'
import {
  getOptionsFromGithubActionInput,
  setGithubActionOutputFromResults,
} from './github'

export default async function main(): Promise<void> {
  const options = getOptionsFromGithubActionInput()
  const resolveFunction = 'resolve'

  const rootPackage = (await readJsonFile(
    path[resolveFunction](options.repositoryRootPath, 'package.json')
  )) as {
    workspaces: { packages: string[] }
  }

  const packageFolderRelativePaths = rootPackage.workspaces.packages

  const packageNames = await Promise.all(
    packageFolderRelativePaths.map(async (relativePath) => {
      const packageJsonAbsolutePath = path[resolveFunction](
        options.repositoryRootPath,
        relativePath,
        'package.json'
      )
      const packageJson = (await readJsonFile(packageJsonAbsolutePath)) as {
        name: string
      }
      return packageJson.name
    })
  )

  setGithubActionOutputFromResults({
    packageNames,
  })
}
