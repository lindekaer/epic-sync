const path = require('path')

require('dotenv').config({ path: path.join(__dirname, '.env') })

const execSync = require('child_process').execSync
const _flow = require('lodash/fp/flow')
const _mapValues = require('lodash/fp/mapValues')
const github = require('octonode')
const fileExists = require('file-exists')

const TASK_FILE_PATH = path.join(__dirname, 'tasks.js')
const tasks = require(TASK_FILE_PATH)

verify([
  {
    failure: process.env.GITHUB_ACCESS_TOKEN == null,
    message: 'Please provide a Github access token as env variable',
  },
  {
    failure: process.env.GITHUB_GIST_ID == null,
    message: 'Please provide a Github gist ID as env variable',
  },
  {
    failure: !fileExists.sync(TASK_FILE_PATH),
    message: 'No tasks.json found - please create it.',
  },
])

const runTasksAndUpdateGists = async (tasks) => {
  // prettier-ignore
  const files = _flow(
    _mapValues(getCommandOutput),
    _mapValues(content => ({ content }))
  )(tasks)

  const client = github.client(process.env.GITHUB_ACCESS_TOKEN).gist()
  await client.editAsync(process.env.GITHUB_GIST_ID, {
    description: `Backup from: ${new Date()}`,
    public: false,
    files,
  })
}

// Utils
// ==========================
const getCommandOutput = (shellCmd) => execSync(shellCmd).toString().trim()

function verify(requirements) {
  requirements.forEach((req) => {
    if (req.failure === true) {
      console.error(req.message)
      process.exit()
    }
  })
}

// Run program
// ==========================
runTasksAndUpdateGists(tasks)
