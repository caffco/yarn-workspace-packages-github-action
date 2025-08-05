import * as core from '@actions/core'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  getOptionsFromGithubActionInput,
  setGithubActionOutputFromResults,
} from './github'

vi.mock('@actions/core')

describe('Github', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('#getOptionsFromGithubActionInput', () => {
    beforeEach(() => {
      vi.spyOn(core, 'getInput').mockImplementation(
        (key) =>
          (
            ({
              repository_path: 'fake-repo-path',
            }) as Record<string, string>
          )[key]
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
      vi.spyOn(core, 'setOutput').mockImplementation(() => {})
      vi.spyOn(core, 'debug').mockImplementation(() => {})
      vi.spyOn(core, 'warning').mockImplementation(() => {})
    })

    it('should log package names', async () => {
      setGithubActionOutputFromResults({
        packageNames: ['package-a', 'package-b'],
      })

      expect(core.debug).toHaveBeenCalledWith(
        'Packages in this workspace: package-a, package-b'
      )
    })

    it('should log a warning if there are no packages', async () => {
      setGithubActionOutputFromResults({
        packageNames: [],
      })

      expect(core.warning).toHaveBeenCalledWith(
        'No packages found in this workspace'
      )
    })
  })
})
