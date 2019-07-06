# Epic sync

Execute system commands and store the output in a Github gist. A backup tool for dotfiles.

## Requirements

You need an `.env` file with following content:

```text
GITHUB_ACCESS_TOKEN=...
GITHUB_GIST_ID=...
```

Also, create a `tasks.json` in the following format:

```text
{
  "backup.txt": "cat ~/quotes.txt"
}
```

## Installation

`npm install`

## Get started

`node index.js`

