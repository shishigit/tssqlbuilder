export type SQLDialects =
    | "mssql"
    | "mysql"
    | "oracle"
    | "postgres"
    | "sqlite"

export interface OrderByValueNode
{
}

export interface Named<Name>
{
    name?: Name;
}

export interface ColumnDefinition<Name, Type> extends Named<Name>
{
    jsType?: Type;
    dataType: string;
    primaryKey?: boolean;
    references?: {
        table: string;
        column: string;
        onDelete?: 'restrict' | 'cascade' | 'no action' | 'set null' | 'set default';
        onUpdate?: 'restrict' | 'cascade' | 'no action' | 'set null' | 'set default';
    };
    notNull?: boolean;
    unique?: boolean;
    defaultValue?: Type;
}

export interface TableDefinition<Name extends string, Row>
{
    name: Name;
    schema: string;
    columns: { [CName in keyof Row]: ColumnDefinition<CName, Row[CName]> };
    dialect?: SQLDialects;
    isTemporary?: boolean;
    foreignKeys?: {
        table: string,
        columns: (keyof Row)[],
        refColumns: string[],
        onDelete?: 'restrict' | 'cascade' | 'no action' | 'set null' | 'set default';
        onUpdate?: 'restrict' | 'cascade' | 'no action' | 'set null' | 'set default';
    }
}

export interface QueryLike
{
    values: any[]
    text: string
}

export interface Executable
{
    toQuery(): QueryLike;
}

export interface Queryable<T> extends Executable
{
    where(...nodes: any[]): Query<T>

    delete(): ModifyingQuery

    select(star: Column<void, void>): Query<T>;

    select<N1 extends string, T1>(n1: Column<N1, T1>): Query<{ [N in N1]: T1 }>;

    select<N1 extends string, T1, N2 extends string, T2>(
        n1: Column<N1, T1>,
        n2: Column<N2, T2>): Query<{ [N in N1]: T1 } & { [N in N2]: T2 }>

    select<N1 extends string, T1, N2 extends string, T2, N3 extends string, T3>(
        n1: Column<N1, T1>,
        n2: Column<N2, T2>,
        n3: Column<N3, T3>): Query<{ [N in N1]: T1 } & { [N in N2]: T2 } & { [N in N3]: T3 }>

    select<U>(...nodesOrTables: any[]): Query<U>

}

export interface Query<T> extends Executable, Queryable<T>
{
    resultType: T;

    from(table: TableNode): Query<T>

    from(statement: string): Query<T>

    update(o: { [key: string]: any }): ModifyingQuery

    update(o: {}): ModifyingQuery

    group(...nodes: any[]): Query<T>

    order(...criteria: OrderByValueNode[]): Query<T>

    limit(l: number): Query<T>

    offset(o: number): Query<T>
}

export interface SubQuery<T>
{
    select<Name>(node: Column<Name, T>): SubQuery<T>

    select(...nodes: any[]): SubQuery<T>

    where(...nodes: any[]): SubQuery<T>

    from(table: TableNode): SubQuery<T>

    from(statement: string): SubQuery<T>

    group(...nodes: any[]): SubQuery<T>

    order(criteria: OrderByValueNode): SubQuery<T>

    exists(): BinaryNode

    notExists(): BinaryNode;

    notExists(subQuery: SubQuery<any>): BinaryNode
}


export interface ModifyingQuery extends Executable
{
    returning<U>(...nodes: any[]): Query<U>

    where(...nodes: any[]): ModifyingQuery
}

export interface TableNode
{
    join(table: TableNode): JoinTableNode

    leftJoin(table: TableNode): JoinTableNode
}

export interface JoinTableNode extends TableNode
{
    on(filter: BinaryNode): TableNode

    on(filter: string): TableNode
}

export interface CreateQuery extends Executable
{
    ifNotExists(): Executable
}

export interface DropQuery extends Executable
{
    ifExists(): Executable
}

export type Columns<T> = {
    [Name in keyof T]: Column<Name, T[Name]>
}

export type Table<Name extends string, T> = TableNode & Queryable<T> & Named<Name> & Columns<T> & {
    getName(): string;
    getSchema(): string;

    literal(statement: string): any;

    create(): CreateQuery
    drop(): DropQuery
    as<OtherName extends string>(name: OtherName): Table<OtherName, T>
    update(o: Partial<T>): ModifyingQuery
    insert(row: T): ModifyingQuery
    insert(rows: T[]): ModifyingQuery
    select(): Query<T>
    select<U>(...nodes: any[]): Query<U>
    from<U>(table: TableNode): Query<U>
    from<U>(statement: string): Query<U>
    star(): Column<void, void>
    subQuery<U>(): SubQuery<U>
    columns: Column<void, void>[]
    sql: SQL;
    alter(): AlterQuery<T>;
    indexes(): IndexQuery;
}

export interface AlterQuery<T> extends Executable
{
    addColumn(column: Column<any, any>): AlterQuery<T>;

    addColumn(name: string, options: string): AlterQuery<T>;

    dropColumn(column: Column<any, any> | string): AlterQuery<T>;

    renameColumn(column: Column<any, any>, newColumn: Column<any, any>): AlterQuery<T>;

    renameColumn(column: Column<any, any>, newName: string): AlterQuery<T>;

    renameColumn(name: string, newName: string): AlterQuery<T>;

    rename(newName: string): AlterQuery<T>
}

export interface IndexQuery
{
    create(): IndexCreationQuery;

    create(indexName: string): IndexCreationQuery;

    drop(indexName: string): Executable;

    drop(...columns: Column<any, any>[]): Executable
}

export interface IndexCreationQuery extends Executable
{
    unique(): IndexCreationQuery;

    using(name: string): IndexCreationQuery;

    on(...columns: (Column<any, any> | OrderByValueNode)[]): IndexCreationQuery;

    withParser(parserName: string): IndexCreationQuery;

    fulltext(): IndexCreationQuery;

    spatial(): IndexCreationQuery;
}

export interface SQL
{
    functions: {
        LOWER<Name>(c: Column<Name, string>): Column<Name, string>
    }
}

export interface BinaryNode
{
    and(node: BinaryNode): BinaryNode

    or(node: BinaryNode): BinaryNode
}

/**
 * 数据库列
 */
export interface Column<Name, T>
{
    name: Name

    in(arr: T[]): BinaryNode

    in(subQuery: SubQuery<T>): BinaryNode

    notIn(arr: T[]): BinaryNode

    equals(node: T | Column<any, T>): BinaryNode

    notEquals(node: T | Column<any, T>): BinaryNode

    gte(node: T | Column<any, T>): BinaryNode

    lte(node: T | Column<any, T>): BinaryNode

    gt(node: T | Column<any, T>): BinaryNode

    lt(node: T | Column<any, T>): BinaryNode

    like(str: string): BinaryNode

    multiply: {
        (node: Column<any, T>): Column<any, T>
        (n: number): Column<any, number> //todo check column names
    }

    isNull(): BinaryNode

    isNotNull(): BinaryNode

    //todo check column names
    sum(): Column<any, number>

    count(): Column<any, number>

    count(name: string): Column<any, number>

    distinct(): Column<Name, T>

    as<OtherName extends string>(name: OtherName): Column<OtherName, T>

    ascending: OrderByValueNode
    descending: OrderByValueNode
    asc: OrderByValueNode
    desc: OrderByValueNode
}

export function define<Name extends string, T>(map: TableDefinition<Name, T>): Table<Name, T>;

export function setDialect(dialect: SQLDialects): void;

