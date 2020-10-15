import * as fs from 'fs'
import {readJsonFile} from './fs'

jest.mock('fs')

describe('fs', () => {
  beforeEach(() => {
    jest
      .spyOn(fs, 'readFile')
      .mockImplementation((filePath, callback) =>
        callback(null, Buffer.from(JSON.stringify({'my-key': 'my-value'})))
      )
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('#readJsonFile', () => {
    it('should read proper file', async () => {
      await readJsonFile('my-file')

      expect(fs.readFile).toHaveBeenCalledWith('my-file', expect.anything())
    })

    it('should return parsed content', async () => {
      await expect(readJsonFile('my-file')).resolves.toEqual({
        'my-key': 'my-value'
      })
    })

    it('should reject on error', async () => {
      jest
        .spyOn(fs, 'readFile')
        .mockImplementation((filePath, callback) =>
          callback(new Error('Forced error'), Buffer.from(''))
        )

      await expect(readJsonFile('my-file')).rejects.toThrowError('Forced error')
    })
  })
})
