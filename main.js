#!/usr/bin/env node
import 'dotenv/config'
import { spawn } from "child_process"
import fs from 'fs'
import { ensureRacerFolder } from "./modules/ensureRacerFolder.js"
import { executeOption } from "./options/snippet/executeOption.js"
import { uploadOneOption } from "./options/file/uploadOne.js"
import { createBucketOption } from "./options/bucket/createBucketOptions.js"
import { peekBucketOption } from "./options/bucket/peekBucket.js"
import { createSnippetOption } from "./options/snippet/createSnippetOption.js"
import {snippetDownloadOption} from './options/snippet/snippetSync.js'
import { snippetLocalListOption } from "./options/snippet/snippetLocalListOption.js"
import { downloadFileOption } from "./options/file/downloadFileOption.js"
import { deleteFileOption } from "./options/file/deleteFile.js"
import { deleteBucketOption } from "./options/bucket/deleteBucketOption.js"
import { clearBucketOption } from "./options/bucket/clearBucket.js"
import { AiOption } from "./options/ai/AIOption.js"
import { createChatSessionOption } from "./options/ai/createChatSessionOption.js"
import { useSessionOption } from "./options/ai/useSessionOption.js"
import { listSessionOption } from "./options/ai/listSessionOption.js"
import { deleteChatSessionOption } from "./options/ai/deleteChatSessionOption.js"
import { createChatPreferencesOption } from "./options/config/createChatPreferencesOption.js"
import { seeConfigOption } from "./options/config/seeConfigOption.js"
import { commandListOption } from "./options/help/commandListOption.js"
import { clearSessionOption } from './options/ai/clearSessionOption.js'
import { listBucketOption } from './options/bucket/listBucketOption.js'

// Ensure .racer folder structure exists
ensureRacerFolder()

const selectedOptionCategory = process.argv[2]
const selectedOptionAction = process.argv[3]


const optionCategory = {
  "snippet": {
    "--execute": executeOption,
    "--download": snippetDownloadOption,
    "--create": createSnippetOption,
    "--list": snippetLocalListOption
  },
  "file": {
    "--upload": uploadOneOption,
    "--delete": deleteFileOption,
    "--download": downloadFileOption
  },
  "bucket": {
    "--create": createBucketOption,
    "--clear": clearBucketOption,
    "--delete": deleteBucketOption,
    "--peek": peekBucketOption,
    "--list": listBucketOption
  },
  "config": {
    "--create-chat-preferences": createChatPreferencesOption,
    "--list": seeConfigOption
  },
  "ai": {
    "--new-session": createChatSessionOption,
    "--delete-session": deleteChatSessionOption,
    "--list-session": listSessionOption,
    "--use-session": useSessionOption,
    "--chat": AiOption,
    "--clear-session": clearSessionOption
  },
  "help": {
    "--command": commandListOption
  }
}

if (!optionCategory[selectedOptionCategory]) {
  process.stdout.write("Select correct category")
  process.exit(1)
}
if (!optionCategory[selectedOptionCategory][selectedOptionAction]) {
  process.stdout.write("Select correct category action")
  process.exit(1)
}
optionCategory[selectedOptionCategory][selectedOptionAction]()

// const racerCliCommandOption = {
//   // Snippet + terminal
//   "execute": executeOption,
//   "snippetDownloads": snippetSyncOption,
//   "createSnippet": createSnippetOption,
//   "snippetLocalList": snippetLocalListOption,

//   // File
//   "uploadFile": uploadOneOption,
//   "deleteFile": deleteFileOption,
//   "downloadFile": downloadFileOption,

//   // Bucket
//   "createBucket": createBucketOption,
//   "clearBucket": clearBucketOption,
//   "deleteBucket": deleteBucketOption,
//   "peekBucket": peekBucketOption,

//   // AI
//   "aiChat": AiOption
// }

// if (racerCliCommandOption[selectedOption]) {
//   racerCliCommandOption[selectedOption]()
// } else {
//   process.stdout.write('Invalid option')
//   process.exit(1)
// }