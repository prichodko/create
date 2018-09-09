#!/usr/bin/env node

'use strict'

const fs = require('fs-extra')
const path = require('path')
const gittar = require('gittar')

const install = async ({ dir }) => {}

const git = async ({ dir }) => {}

const iny = async ({ name, template, pkg = { name } } = {}) => {
  const targetDir = path.resolve(name)

  if (fs.existsSync(targetDir)) {
    return console.log('Target dir already exists.')
  }

  if (fs.existsSync(template)) {
    console.log('exists')
  } else {
    const [user, repo, ...paths] = template.split('/')

    const archive = await gittar.fetch(`${user}/${repo}`).catch(err => {
      err = err || { message: 'An error occured while fetching template.' }
      return console.log(
        err.code === 404 ? `Could not find repository: ${repo}` : err.message,
        1
      )
    })

    fs.ensureDirSync(targetDir)

    await gittar.extract(archive, targetDir, {
      strip: 2,
      filter(path, entry) {
        if (path.includes(paths.join('/'))) {
          // return true
        }
        return false
      }
    })
  }

  if (!name) {
  }

  if (!template) {
  }

  // const package = {

  // }

  // check dir
  // install
  // initialize git

  // await install({ dir })
  // await git({ dir })
}

const main = async () => {
  // await iny({ path: path.join(__dirname, "../templates/cli") })
  await iny({
    name: 'hello-world',
    dest: '',
    template: 'prichodko/create/templates/cli'
  })
}

main()
