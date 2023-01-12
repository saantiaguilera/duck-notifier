import configJson from '../../config/telegram.json'

// Hidrate config fields from json file and export them
const { accessToken, chatId } = configJson
const TELEGRAM_ACCESS_TOKEN = accessToken
const TELEGRAM_CHAT_ID = chatId

export { TELEGRAM_ACCESS_TOKEN, TELEGRAM_CHAT_ID }