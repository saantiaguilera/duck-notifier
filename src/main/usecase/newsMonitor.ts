import { News } from "../domain/news"
import { Tag } from "../domain/tag"

interface MessageRepository {
    sendMessage: (msg: string) => Promise<void>
}

interface NewsProvider {
    name: string
    get: () => Promise<News[]>
}

export class NewsMonitor {

    private messager: MessageRepository
    private newsProviders: NewsProvider[]

    constructor(newsProviders: NewsProvider[], messager: MessageRepository) {
        this.newsProviders = newsProviders
        this.messager = messager
    }

    async monitor(tags: Tag[]): Promise<void> {
        this.newsProviders.forEach(async (source) => {
            (await source.get())
                .filter((news) => tags.find((tag) => news.applies(tag)))
                .forEach(async (news) => {
                    console.log(`match! sending message about ${news.title}`)
                    await this.messager.sendMessage(`[${source.name}] ${news.title}\n\n${news.content}\n\nLink: ${news.link}`)
                })
        })
    }
}