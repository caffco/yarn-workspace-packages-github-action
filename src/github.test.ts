import * as core from '@actions/core'
import {
  getOptionsFromGithubActionInput,
  setGithubActionOutputFromResults
} from './github'

jest.mock('@actions/core')

describe('Github', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('#getOptionsFromGithubActionInput', () => {
    beforeEach(() => {
      jest.spyOn(core, 'getInput').mockImplementation(
        key =>
          (({
            repository_path: 'fake-repo-path'
          } as Record<string, string>)[key])
      )
    })

    it('should return proper value for `repositoryRootPath`', () => {
      expect(getOptionsFromGithubActionInput()).toHaveProperty(
        'repositoryRootPath',
        'fake-repo-path'
      )
      expect(core.getInput).toHaveBeenCalledWith('repository_path')
    })
  })

  describe('#setGithubActionOutputFromResults', () => {
    beforeEach(() => {
      jest.spyOn(core, 'setOutput').mockImplementation(() => {})
      jest.spyOn(core, 'info').mockImplementation(() => {})
      jest.spyOn(core, 'warning').mockImplementation(() => {})
    })

    it('should log package names', async () => {
      setGithubActionOutputFromResults({
        packageNames: ['package-a', 'package-b']
      })

      expect(core.debug).toHaveBeenCalledWith(
        'Packages in this workspace: package-a, package-b'
      )
    })

    it('should log a warning if there are no packages', async () => {
      setGithubActionOutputFromResults({
        packageNames: []
      })

      expect(core.warning).toHaveBeenCalledWith(
        'No packages found in this workspace'
      )
    })
  })
})
