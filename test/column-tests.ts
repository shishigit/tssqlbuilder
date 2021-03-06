import assert from 'assert'
import Sql from './../index'

describe('column', function ()
{
    var table = Sql.define({
        name: 'user',
        columns: ['id', 'created', 'alias']
    });

    it('can be accessed by property and array', function ()
    {
        assert.strictEqual(table.created, table.columns[1], 'should be able to access created both by array and property');
    });

    describe('toQuery()', function ()
    {
        it('works', function ()
        {
            assert.strictEqual(table.id.toQuery().text, '"user"."id"');
        });

        it('works with a column name of "alias"', function ()
        {
            assert.strictEqual(table.alias.toQuery().text, '"user"."alias"');
        });

        it('respects AS rename', function ()
        {
            assert.strictEqual(table.id.as('userId').toQuery().text, '"user"."id" AS "userId"');
        });

        it('respects count and distinct', function ()
        {
            assert.strictEqual(table.id.count().distinct().as("userIdCount").toQuery().text, 'COUNT(DISTINCT("user"."id")) AS "userIdCount"');
        });

        describe('in subquery with min', function ()
        {
            var subquery = table.subQuery('subTable').select(table.id.min().as('subId'));
            var col = subquery.subId.toQuery().text;
            assert.strictEqual(col, '"subTable"."subId"');
        });

        describe('property', function ()
        {
            var table = Sql.define({
                name: 'roundtrip',
                columns: {
                    column_name: {property: 'propertyName'}
                }
            });
            it('used as alias when !== column name', function ()
            {
                assert.strictEqual(table.propertyName.toQuery().text, '"roundtrip"."column_name" AS "propertyName"');
            });
            it('uses explicit alias when !== column name', function ()
            {
                assert.strictEqual(table.propertyName.as('alias').toQuery().text, '"roundtrip"."column_name" AS "alias"');
            });
            it('maps to column name in insert', function ()
            {
                assert.strictEqual(table.insert({propertyName: 'propVal'}).toQuery().text, 'INSERT INTO "roundtrip" ("column_name") VALUES ($1)');
            });
            it('maps to column name in update', function ()
            {
                assert.strictEqual(table.update({propertyName: 'propVal'}).toQuery().text, 'UPDATE "roundtrip" SET "column_name" = $1');
            });
            it('explicitly selected by *', function ()
            {
                assert.strictEqual(table.select(table.star()).from(table).toQuery().text, 'SELECT "roundtrip"."column_name" AS "propertyName" FROM "roundtrip"');
            });
        });

        describe('autoGenerate', function ()
        {
            var table = Sql.define({
                name: 'ag',
                columns: {
                    id: {autoGenerated: true},
                    name: {}
                }
            });
            it('does not include auto generated columns in insert', function ()
            {
                assert.strictEqual(table.insert({
                    id: 0,
                    name: 'name'
                }).toQuery().text, 'INSERT INTO "ag" ("name") VALUES ($1)');
            });
            it('does not include auto generated columns in update', function ()
            {
                assert.strictEqual(table.update({id: 0, name: 'name'}).toQuery().text, 'UPDATE "ag" SET "name" = $1');
            });
        });

        describe('white listed', function ()
        {
            var table = Sql.define({
                name: 'wl',
                columnWhiteList: true,
                columns: ['id', 'name']
            });
            it('excludes insert properties that are not a column', function ()
            {
                assert.strictEqual(table.insert({
                    id: 0,
                    _private: '_private',
                    name: 'name'
                }).toQuery().text, 'INSERT INTO "wl" ("id", "name") VALUES ($1, $2)');
            });
            it('excludes update properties that are not a column', function ()
            {
                assert.strictEqual(table.update({
                    id: 0,
                    _private: '_private',
                    name: 'name'
                }).toQuery().text, 'UPDATE "wl" SET "id" = $1, "name" = $2');
            });
        });

        describe('not white listed', function ()
        {
            var table = Sql.define({
                name: 'wl',
                columns: ['id', 'name']
            });
            it('throws for insert properties that are not a column', function ()
            {
                assert.throws(function ()
                {
                    table.insert({id: 0, _private: '_private', name: 'name'});
                }, Error);
            });
            it('throws for update properties that are not a column', function ()
            {
                assert.throws(function ()
                {
                    table.update({id: 0, _private: '_private', name: 'name'});
                }, Error);
            });
        });

        describe('snake to camel', function ()
        {
            var table = Sql.define({
                name: 'sc',
                snakeToCamel: true,
                columns: {
                    make_me_camel: {},
                    not_to_camel: {property: 'not2Cam'}
                }
            });
            it('for snake column names with no explicit property name', function ()
            {
                assert.strictEqual(table.makeMeCamel.toQuery().text, '"sc"."make_me_camel" AS "makeMeCamel"');
            });
            it('but not when with explicit property name', function ()
            {
                assert.strictEqual(table.not2Cam.toQuery().text, '"sc"."not_to_camel" AS "not2Cam"');
            });
            it('does not use property alias within CASE ... END', function ()
            {
                assert.strictEqual(table.makeMeCamel.case([table.makeMeCamel.equals(0)], [table.makeMeCamel]).as('rename').toQuery().text,
                    '(CASE WHEN ("sc"."make_me_camel" = $1) THEN "sc"."make_me_camel" END) AS "rename"');
            });
            it('respects AS rename in RETURNING clause', function ()
            {
                assert.strictEqual(table.update({makeMeCamel: 0}).returning(table.makeMeCamel.as('rename')).toQuery().text,
                    'UPDATE "sc" SET "make_me_camel" = $1 RETURNING "make_me_camel" AS "rename"');
            });
        });
    });
});
