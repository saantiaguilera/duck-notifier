import { News } from "../../domain/news"
const { JSDOM } = require("jsdom")

interface HttpResponse<T = any> {
    data: T
    status: number
}

interface HttpClient {

    get<T = any, R = HttpResponse<T>>(url: string, config?: unknown): Promise<R>
}

export class RevistaPetroquimicaProvider {

    private static readonly URL: string = "https://www.revistapetroquimica.com/feed/"

    private httpClient: HttpClient

    name: string = "Revista Petroquimica"

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient
    }

    async get(): Promise<News[]> {
        try {
            let res: News[] = []
            const response = await this.httpClient.get(RevistaPetroquimicaProvider.URL)

            if (response.status == 200) {
                const doc = new JSDOM(response.data, {
                    contentType: "text/xml"
                }).window.document
                const titles = doc.querySelectorAll("rss channel item title")
                const descs = doc.querySelectorAll("rss channel item description")
                const links = doc.querySelectorAll("rss channel item link")

                for (let i = 0; i < descs.length; i++) {
                    res.push(new News(titles[i].textContent, descs[i].textContent, links[i].textContent))
                }
            }
            
            return res
        } catch(err: unknown) {
            console.log(err)
            return [] // timeout? TODO: Handle it
        }
    }
}