
export interface Lie
{
    minghcheng: string
    weikong: boolean
    weiyi: boolean
}

export interface Biao
{
    mingcheng: string
    shujuku: Shujuku
    lies: {
        [lie: string]: Lie
    }
}

export interface Shujuku
{
    mingcheng: string
}