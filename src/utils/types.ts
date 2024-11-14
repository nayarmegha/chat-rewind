export interface oldChat {
    date: Date
    author: string
    message: string
    attachment?: {
        fileName: string
    },
}

export interface newChat {
    date: Date
    name: string
    content: {
        text: string
        attach?: string
        event?: string
        reacts?: number
    }
}
