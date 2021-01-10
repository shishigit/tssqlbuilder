import { Lie } from "./shujuleixing";

class SelectSql
{
    private lies: Lie[];
    constructor(
        ...lies: Lie[]
    )
    {
        this.lies = lies
    }
}

export function Select(
    ...lies: Lie[]
)
{
    return new SelectSql(...lies)
}