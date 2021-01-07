import { Table } from "./table"

type SqlType = 'insert' | 'delete' | 'update' | 'select'

export class Sql
{
    private constructor(
        readonly type: SqlType
    )
    {

    }

    static insert()
    {
        return new Sql('insert')
    }

    private _into?: string
    into(table: Table)
    {
        this._into = table.name
        return this
    }

    toQuery() { }
}
