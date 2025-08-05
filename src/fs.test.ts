import fs from 'fs'
import {describe, it, expect, beforeEach, afterEach, vi} from 'vitest'
import {readJsonFile} from './fs'

vi.mock('fs', () => ({
  default: {
    readFile: vi.fn()
  }
}))

describe('fs', () => {
  beforeEach(() => {
    vi.mocked(fs.readFile).mockImplementation((filePath, callback) =>
      callback(null, Buffer.from(JSON.stringify({'my-key': 'my-value'})))
    )
  })

  afterEach(() => {
    vi.restoreAllMocks()
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
      vi.mocked(fs.readFile).mockImplementation((filePath, callback) =>
        callback(new Error('Forced error'), Buffer.from(''))
      )

      await expect(readJsonFile('my-file')).rejects.toThrowError('Forced error')
    })
  })
})
