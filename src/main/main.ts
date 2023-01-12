import axios from 'axios'

import { TelegramClient } from './service/telegram/client'
import { TELEGRAM_ACCESS_TOKEN, TELEGRAM_CHAT_ID } from './telegram'

import { RevistaPetroquimicaProvider } from './service/revistapetroquimica/provider'

import { NewsMonitor } from './usecase/newsMonitor'

import { News } from './domain/news'
import { Tag } from './domain/tag'

interface NewsProvider {
    name: string
    get: () => Promise<News[]>
}

async function main() {
    const tgClient: TelegramClient = new TelegramClient(axios, TELEGRAM_ACCESS_TOKEN, TELEGRAM_CHAT_ID)

    // add tags of your interest here
    const tags: Tag[] = [
        new Tag("YPF"),
    ]

    // add providers of your interest here
    const providers: NewsProvider[] = [
        new RevistaPetroquimicaProvider(axios),
    ]
    
    // create usecase and invoke blocking
    await new NewsMonitor(providers, tgClient).monitor(tags)
}
  
main()