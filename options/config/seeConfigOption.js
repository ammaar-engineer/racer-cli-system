import { configurationFileData } from "../../modules/see-config.js";

export function seeConfigOption() {
    const {configData} = configurationFileData()
    console.log(configData)
}