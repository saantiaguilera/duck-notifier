import { Tag } from "./tag"

export class News {
    title: string
    content: string
    link: string

    constructor(title: string, content: string, link: string) {
        this.title = title
        this.content = content
        this.link = link
    }

    applies(tag: Tag): boolean {
        return this.title.toLowerCase().includes(tag.key.toLowerCase()) || this.content.toLowerCase().includes(tag.key.toLowerCase())
    }
}