# Epic sync

Execute system commands and store the output in a Github gist.

## Requirements

You need an `.env` file with following content:

```text
GITHUB_ACCESS_TOKEN=[SOME_TOKEN]
GITHUB_GIST_ID=[SOME_ID]
```

Create a `tasks.js` containing an object with filenames (key) and terminal commands (value). The output from each terminal command will be stored under the corresponding filename dicatated by the key. Consider this example:

```text
{
  "backup.txt": "cat ~/quotes.txt"
}
```

## Installation

`npm install`

## Get started

`node index.js`

## Misc.

### CRON job on Mac OS

In the terminal run `crontab -e` and add content similar to `0 12 * * * /usr/local/node /user/epic-sync/index.js`
