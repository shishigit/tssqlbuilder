import assert from 'assert'
import {suite, test} from 'mocha'
import {Table} from '../table';
import {Column} from '../column'
import {Sql} from '../index';

suite('table', function ()
{
    const table = new Table({
        name: 'bang'
    });

    test('has name', function ()
    {
        assert.strictEqual(table.getName(), 'bang');
    });

    test('has no columns', function ()
    {
        assert.strictEqual(table.columns.length, 0);
    });

    test('can add column', function ()
    {
        const col = new Column({
            table: table,
            name: 'boom'
        });

        assert.strictEqual(col.name, 'boom');
        assert.strictEqual(col.table.getName(), 'bang');

        table.addColumn(col);
        assert.strictEqual(table.columns.length, 1);
        assert.strictEqual(table.boom, col);
    });

    test('creates query node', function ()
    {
        const sel = table.select(table.boom);
        assert.strictEqual(sel.type, 'QUERY');
    });

    test('creates *-query if no args is provided to select()', function ()
    {
        const sel = table.select();
        assert.ok(sel.nodes[0].nodes[0].star);
    });

    test('can be defined', function ()
    {
        const user = Table.define({
            name: 'user',
            columns: ['id', 'name']
        });
        assert.strictEqual(user.getName(), 'user');
        assert.strictEqual(user.columns.length, 2);
        assert.strictEqual(user.columns[0].name, 'id');
        assert.strictEqual(user.columns[1].name, 'name');
        assert.strictEqual(user.columns[0].name, user.id.name);
        assert.strictEqual(user.id.table, user);
        assert.strictEqual(user.name.table, user);
    });
});

test('table with user-defined column property names', function ()
{
    const table = Table.define({
        name: 'blah',
        columns: [{
            name: 'id',
            property: 'theId'
        }, {
            name: 'email',
            property: 'uniqueEmail'
        }]
    });
    const cols = table.columns;
    assert.strictEqual(cols.length, 2);
    assert.strictEqual(cols[0].name, 'id');
    assert(cols[0] === table.theId, 'Expected table.theId to be the first column');
    assert(table.id === undefined, 'Expected table.id to not exist');
    assert.strictEqual(cols[1].name, 'email');
    assert(cols[1] === table.uniqueEmail, 'Expected table.uniqueEmail to be the second column');
    assert(table.email === undefined, 'Expected table.email to not exist');
});

test('table with fancier column definitions', function ()
{
    const table = Table.define({
        name: 'blah',
        columns: [{
            name: 'id',
            type: 'serial',
            notNull: true,
            primaryKey: true
        }, {
            name: 'email',
            type: 'text',
            notNull: true,
            unique: true,
            anythingYouWant: 'awesome'
        }]
    });
    const cols = table.columns;
    assert.strictEqual(cols.length, 2);
    const id = cols[0];
    assert.strictEqual(id.name, 'id');
    assert.strictEqual(id.type, 'serial');
    assert.strictEqual(id.notNull, true);
    assert.strictEqual(id.primaryKey, true);
    const email = cols[1];
    assert.strictEqual(email.name, 'email');
    assert.strictEqual(email.type, 'text');
    assert.strictEqual(email.notNull, true);
    assert.strictEqual(email.unique, true);
    assert.strictEqual(email.anythingYouWant, 'awesome');
});

test('table with object structured column definitions', function ()
{
    const table = Table.define({
        name: 'blah',
        columns: {
            id: {
                type: 'serial',
                notNull: true,
                primaryKey: true
            },
            email: {
                type: 'text',
                notNull: true,
                unique: true,
                anythingYouWant: 'awesome'
            }
        }
    });
    const cols = table.columns;
    assert.strictEqual(cols.length, 2);
    const id = cols[0];
    assert.strictEqual(id.name, 'id');
    assert.strictEqual(id.type, 'serial');
    assert.strictEqual(id.notNull, true);
    assert.strictEqual(id.primaryKey, true);
    const email = cols[1];
    assert.strictEqual(email.name, 'email');
    assert.strictEqual(email.type, 'text');
    assert.strictEqual(email.notNull, true);
    assert.strictEqual(email.unique, true);
    assert.strictEqual(email.anythingYouWant, 'awesome');
});

test('table with dynamic column definition', function ()
{
    const table = Table.define({name: 'foo', columns: []});
    assert.strictEqual(table.columns.length, 0);

    table.addColumn('foo');
    assert.strictEqual(table.columns.length, 1);

    assert.throws(function ()
    {
        table.addColumn('foo');
    });

    assert.doesNotThrow(function ()
    {
        table.addColumn('foo', {noisy: false});
    });

    assert.strictEqual(table.columns.length, 1);
});

test('hasColumn', function ()
{
    const table = Table.define({name: 'foo', columns: []});

    assert.strictEqual(table.hasColumn('baz'), false);
    table.addColumn('baz');
    assert.strictEqual(table.hasColumn('baz'), true);
});

test('hasColumn with user-defined column property', function ()
{
    const table = Table.define({
        name: 'blah',
        columns: [{
            name: 'id',
            property: 'theId'
        }, {name: 'foo'}]
    });

    assert.strictEqual(table.hasColumn('id'), true);
    assert.strictEqual(table.hasColumn('theId'), true);
});

test('the column "from" does not overwrite the from method', function ()
{
    const table = Table.define({name: 'foo', columns: []});
    table.addColumn('from');
    assert.strictEqual(typeof table.from, 'function');
});

test('getColumn returns the from column', function ()
{
    const table = Table.define({name: 'foo', columns: []});
    table.addColumn('from');
    assert(table.getColumn('from') instanceof Column);
    assert(table.get('from') instanceof Column);
});

test('set and get schema', function ()
{
    const table = Table.define({name: 'foo', schema: 'bar', columns: []});
    assert.strictEqual(table.getSchema(), 'bar');
    table.setSchema('barbarz');
    assert.strictEqual(table.getSchema(), 'barbarz');
});

suite('table.clone', function ()
{
    test('check if it is a copy, not just a reference', function ()
    {
        const table = Table.define({name: 'foo', columns: []});
        const copy = table.clone();
        assert.notEqual(table, copy);
    });

    test('copy columns', function ()
    {
        const table = Table.define({name: 'foo', columns: ['bar']});
        const copy = table.clone();
        assert(copy.get('bar') instanceof Column);
    });

    test('overwrite config while copying', function ()
    {
        const table = Table.define({
            name: 'foo',
            schema: 'foobar',
            columns: ['bar'],
            snakeToCamel: true,
            columnWhiteList: true
        });

        const copy = table.clone({
            schema: 'test',
            snakeToCamel: false,
            columnWhiteList: false
        });

        assert.strictEqual(copy.getSchema(), 'test');
        assert.strictEqual(copy.snakeToCamel, false);
        assert.strictEqual(copy.columnWhiteList, false);
    });
});

test('dialects', function ()
{
    let sql = new Sql('mysql');
    let foo = sql.define({name: 'foo', columns: ['id']}),
        bar = sql.define({name: 'bar', columns: ['id']});

    let actual = foo.join(bar).on(bar.id.equals(1)).toString();
    assert.strictEqual(actual, '`foo` INNER JOIN `bar` ON (`bar`.`id` = 1)');

    sql = new Sql('postgres');
    foo = sql.define({name: 'foo', columns: ['id']});
    bar = sql.define({name: 'bar', columns: ['id']});
    actual = foo.join(bar).on(bar.id.equals(1)).toString();
    assert.strictEqual(actual, '"foo" INNER JOIN "bar" ON ("bar"."id" = 1)');
});

test('limit', function ()
{
    const user = Table.define({name: 'user', columns: ['id', 'name']});
    const query = user.limit(3);
    assert.strictEqual(query.nodes.length, 1);
    assert.strictEqual(query.nodes[0].type, 'LIMIT');
    assert.strictEqual(query.nodes[0].count, 3);
});

test('offset', function ()
{
    const user = Table.define({name: 'user', columns: ['id', 'name']});
    const query = user.offset(20);
    assert.strictEqual(query.nodes.length, 1);
    assert.strictEqual(query.nodes[0].type, 'OFFSET');
    assert.strictEqual(query.nodes[0].count, 20);
});

test('order', function ()
{
    const user = Table.define({name: 'user', columns: ['id', 'name']});
    const query = user.order(user.name);
    assert.strictEqual(query.nodes.length, 1);
    assert.strictEqual(query.nodes[0].type, 'ORDER BY');
});
