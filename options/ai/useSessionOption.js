import { configurationFileData } from "../../modules/see-config.js";
import fs from 'fs'
import path from 'path'
import os from 'os'
import { fileSelectionInFolder } from "../../modules/fileSelectionInFolder.js";

export async function useSessionOption() {
  const selectedSession = await fileSelectionInFolder(
    path.join(os.homedir(), '.racer', 'aichat'),
    "Select chat session:",
    {
      emptyErr: "No session"
    }
  )

  const { pathToConfig, configData } = configurationFileData()
  const newSession = { ...configData, "current-chat-session": selectedSession }
  fs.writeFileSync(pathToConfig, JSON.stringify(newSession))
  console.log("Session used: ", selectedSession)
}
