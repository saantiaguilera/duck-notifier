import { Tag } from "./tag"

// News class denoting a piece of information with a title/content and its source hyperlink.
export class News {
    title: string
    content: string
    link: string

    constructor(title: string, content: string, link: string) {
        this.title = title
        this.content = content
        this.link = link
    }

    // applies returns true if the given news applies to the specified tag 
    applies(tag: Tag): boolean {
        // for now we simply do a simple contains check in the title and content
        return this.title.toLowerCase().includes(tag.key.toLowerCase()) || this.content.toLowerCase().includes(tag.key.toLowerCase())
    }
}