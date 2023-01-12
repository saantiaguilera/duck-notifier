interface HttpResponse<T = unknown> {
    data: T
    status: number
}

interface HttpClient {

    post<T = unknown, R = HttpResponse<T>>(url: string, data?: unknown, config?: unknown): Promise<R>
}

// TelegramClient for sending messages to a given chatId
export class TelegramClient {

    private httpClient: HttpClient

    private url: string
    private chatId: string

    constructor(httpClient: HttpClient, accessToken: string, chatId: string) {
        this.httpClient = httpClient
        this.url = "https://api.telegram.org/bot" + accessToken + "/sendMessage"
        this.chatId = chatId
    }

    async sendMessage(msg: string): Promise<void> {
        await this.httpClient.post(this.url, {
            chat_id: this.chatId,
            text: msg,
            disable_notification: false,
        });
    }
}