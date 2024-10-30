export interface Chat {
    date: Date
    name: string
    content: {
        text : string,
        attach : string,
        event : string,
        reacts : number
    }
}