# Epic sync

Execute system commands and store the output in a Github gist.

## Requirements

You need an `.env` file with following content:

```text
GITHUB_ACCESS_TOKEN=...
GITHUB_GIST_ID=...
```

Create a `tasks.json` containing an object with filenames (key) and terminal commands (value). The output from each terminal command will be stored under the corresponding filename dicatated by the key. Consider this example:
```text
{
  "backup.txt": "cat ~/quotes.txt"
}
```




## Installation

`npm install`

## Get started

`node index.js`

## CRON job on Mac OS

`crontab -e` with content similar to `0 12 * * * /usr/local/node /user/epic-sync/index.js`
