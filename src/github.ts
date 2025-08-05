import { debug, getInput, setOutput, warning } from '@actions/core'

export function getOptionsFromGithubActionInput(): {
  repositoryRootPath: string
} {
  return {
    repositoryRootPath: getInput('repository_path'),
  }
}

export function setGithubActionOutputFromResults({
  packageNames,
}: {
  packageNames: string[]
}): void {
  debug(`Packages in this workspace: ${packageNames.join(', ')}`)
  setOutput('package_names', packageNames)

  if (!packageNames.length) {
    warning('No packages found in this workspace')
  }
}
