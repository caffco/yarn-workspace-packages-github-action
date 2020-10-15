import * as fs from './fs'
import * as github from './github'

import main from './main'

describe('Main', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('#default', () => {
    const fakeInput = {
      repositoryRootPath: '/fake-root'
    }

    beforeEach(() => {
      jest
        .spyOn(github, 'getOptionsFromGithubActionInput')
        .mockReturnValue(fakeInput)
      jest
        .spyOn(github, 'setGithubActionOutputFromResults')
        .mockImplementation(() => {})

      jest
        .spyOn(fs, 'readJsonFile')
        .mockResolvedValueOnce({
          workspaces: {
            packages: ['packages/package-a', 'packages/package-b']
          }
        })
        .mockResolvedValueOnce({
          name: 'package-a'
        })
        .mockResolvedValueOnce({
          name: 'package-b'
        })
    })

    it('should load root package.json from proper path', async () => {
      await expect(main()).resolves.toBeUndefined()

      expect(fs.readJsonFile).toHaveBeenCalledWith('/fake-root/package.json')
    })

    it('should load package.json of each package', async () => {
      await expect(main()).resolves.toBeUndefined()

      expect(fs.readJsonFile).toHaveBeenCalledWith(
        '/fake-root/packages/package-a/package.json'
      )
      expect(fs.readJsonFile).toHaveBeenCalledWith(
        '/fake-root/packages/package-b/package.json'
      )
    })

    it('should set Github action output to proper values', async () => {
      await expect(main()).resolves.toBeUndefined()

      expect(github.setGithubActionOutputFromResults).toHaveBeenCalledWith({
        packageNames: ['package-a', 'package-b']
      })
    })
  })
})
