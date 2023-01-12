import { News } from "../domain/news"
import { Tag } from "../domain/tag"

interface MessageRepository {
    sendMessage: (msg: string) => Promise<void>
}

interface NewsProvider {
    name: string
    get: () => Promise<News[]>
}

// NewsMonitor is the usecase that allows us to monitor news accross different providers
// if a tag we are looking for is present in any of the news provided by our data sources
// then we will format it in a message style and broadcast it through a message repository.
export class NewsMonitor {

    private messager: MessageRepository
    private newsProviders: NewsProvider[]

    constructor(newsProviders: NewsProvider[], messager: MessageRepository) {
        this.newsProviders = newsProviders
        this.messager = messager
    }

    // monitor the given tags and notify through the message repository
    // if any of the news provided by our data sources matches them
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