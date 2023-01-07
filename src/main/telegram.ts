import configJson from '../../config/telegram.json'

const { accessToken, chatId } = configJson
const TELEGRAM_ACCESS_TOKEN = accessToken
const TELEGRAM_CHAT_ID = chatId

export { TELEGRAM_ACCESS_TOKEN, TELEGRAM_CHAT_ID }