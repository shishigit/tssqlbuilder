export class Table
{
    static define<T>(): { [key: keyof T ]: any }
    {
        return {}
    }
}