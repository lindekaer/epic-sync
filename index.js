const path = require('path')

require('dotenv').config({ path: path.join(__dirname, '.env') })

const fs = require('fs')
const execSync = require('child_process').execSync
const _flow = require('lodash/fp/flow')
const _mapValues = require('lodash/fp/mapValues')
const github = require('octonode')
const fileExists = require('file-exists')

const TASK_FILE = path.join(__dirname, 'tasks.json')

if (process.env.GITHUB_ACCESS_TOKEN == null || process.env.GITHUB_GIST_ID == null) {
  console.log('Environment variables not provided')
  process.exit()
}

if (!fileExists.sync(TASK_FILE)) {
  console.log('Missing tasks.json')
  process.exit()
}

const client = github.client(process.env.GITHUB_ACCESS_TOKEN).gist()
const tasks = JSON.parse(fs.readFileSync(TASK_FILE))

const runUpdate = async tasks => {
  // prettier-ignore
  const files = _flow(
    _mapValues(getCommandOutput),
    _mapValues(content => ({ content }))
  )(tasks)

  await client.editAsync(process.env.GITHUB_GIST_ID, {
    description: `Personal backup from: ${new Date()}`,
    public: false,
    files
  })

  console.log('Completed!')
}

// Utils
// ==========================
const getCommandOutput = shellCmd =>
  execSync(shellCmd)
    .toString()
    .trim()

// Run program
// ==========================
runUpdate(tasks)
