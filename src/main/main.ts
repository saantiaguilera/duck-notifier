import axios from 'axios'

import { News } from './domain/news'

import { TelegramClient } from './service/telegram/client'
import { TELEGRAM_ACCESS_TOKEN, TELEGRAM_CHAT_ID } from './telegram'

import { RevistaPetroquimicaProvider } from './service/revistapetroquimica/provider'
import { NewsMonitor } from './usecase/newsMonitor'
import { Tag } from './domain/tag'

interface NewsProvider {
    name: string
    get: () => Promise<News[]>
}

async function main() {
    const tgClient: TelegramClient = new TelegramClient(axios, TELEGRAM_ACCESS_TOKEN, TELEGRAM_CHAT_ID)

    // add tags of your interest here
    const tags = [
        new Tag("YPF")
    ]

    const providers = [
        new RevistaPetroquimicaProvider(axios)
    ]
    
    await new NewsMonitor(providers, tgClient).monitor(tags)
}
  
main()