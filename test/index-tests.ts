import assert from 'assert'

import sql, {Sql, Sqlcreate} from '../index';
import {suite, test} from 'mocha'

const user = sql.define({
    name: 'user',
    columns: ['id', 'email']
});

suite('index', function ()
{
    test('unknown dialect throws exception', function ()
    {
        assert.throws(function ()
        {
            sql.setDialect('asdf' as any);
        });
    });

    test('stores the default dialect\'s name if none has been passed', function ()
    {
        assert.strictEqual(Sqlcreate().dialectName, 'postgres');
    });

    test('stores the sqlite dialect', function ()
    {
        assert.strictEqual(Sqlcreate('sqlite').dialectName, 'sqlite');
    });

    test('stores the mysql dialect', function ()
    {
        assert.strictEqual(Sqlcreate('mysql').dialectName, 'mysql');
    });

    test('stores the mssql dialect', function ()
    {
        assert.strictEqual(Sqlcreate('mssql').dialectName, 'mssql');
    });

    test('stores the oracle dialect', function ()
    {
        assert.strictEqual(Sqlcreate('oracle').dialectName, 'oracle');
    });


    test('can create a query using the default dialect', function ()
    {
        const query = sql.select(user.id).from(user).where(user.email.equals('brian.m.carlson@gmail.com')).toQuery();
        assert.strictEqual(query.text, 'SELECT "user"."id" FROM "user" WHERE ("user"."email" = $1)');
        assert.strictEqual(query.values[0], 'brian.m.carlson@gmail.com');
    });

    test('setting dialect to postgres works', function ()
    {
        sql.setDialect('postgres');
        const query = sql.select(user.id).from(user).where(user.email.equals('brian.m.carlson@gmail.com')).toQuery();
        assert.strictEqual(query.text, 'SELECT "user"."id" FROM "user" WHERE ("user"."email" = $1)');
        assert.strictEqual(query.values[0], 'brian.m.carlson@gmail.com');
    });

    test('sql.create creates an instance with a new dialect', function ()
    {
        const mysql = Sqlcreate('mysql');
        const query = mysql.select(user.id).from(user).where(user.email.equals('brian.m.carlson@gmail.com')).toQuery();
        assert.strictEqual(query.text, 'SELECT `user`.`id` FROM `user` WHERE (`user`.`email` = ?)');
        assert.strictEqual(query.values[0], 'brian.m.carlson@gmail.com');
    });

    test('sql.define for parallel dialects work independently', function ()
    {
        const mssql = Sqlcreate('mssql');
        const mysql = Sqlcreate('mysql');
        const postgres = Sqlcreate('postgres');
        const sqlite = Sqlcreate('sqlite');
        const oracle = Sqlcreate('oracle');

        const mssqlTable = mssql.define({name: 'table', columns: ['column']});
        const mysqlTable = mysql.define({name: 'table', columns: ['column']});
        const postgresTable = postgres.define({name: 'table', columns: ['column']});
        const sqliteTable = sqlite.define({name: 'table', columns: ['column']});
        const oracleTable = oracle.define({name: 'table', columns: ['column']});

        assert.strictEqual(mysqlTable.sql, mysql);
        assert.strictEqual(postgresTable.sql, postgres);
        assert.strictEqual(sqliteTable.sql, sqlite);
        assert.strictEqual(mssqlTable.sql, mssql);
        assert.strictEqual(oracleTable.sql, oracle);
    });

    test('using Sql as a class', function ()
    {
        const mssql = new Sql('mssql');
        const mysql = new Sql('mysql');
        const postgres = new Sql('postgres');
        const sqlite = new Sql('sqlite');
        const oracle = new Sql('oracle');

        assert.strictEqual(mysql.dialect, require(__dirname + '/../dialect/mysql'));
        assert.strictEqual(postgres.dialect, require(__dirname + '/../dialect/postgres'));
        assert.strictEqual(sqlite.dialect, require(__dirname + '/../dialect/sqlite'));
        assert.strictEqual(mssql.dialect, require(__dirname + '/../dialect/mssql'));
        assert.strictEqual(oracle.dialect, require(__dirname + '/../dialect/oracle'));
    });

    test('override dialect for toQuery using dialect name', function ()
    {
        const mssql = new Sql('mssql');
        const mysql = new Sql('mysql');
        const postgres = new Sql('postgres');
        const sqlite = new Sql('sqlite');
        const oracle = new Sql('oracle');

        const sqliteQuery = mysql.select(user.id).from(user).where(user.email.equals('brian.m.carlson@gmail.com')).toQuery('sqlite');
        const postgresQuery = sqlite.select(user.id).from(user).where(user.email.equals('brian.m.carlson@gmail.com')).toQuery('postgres');
        const mysqlQuery = postgres.select(user.id).from(user).where(user.email.equals('brian.m.carlson@gmail.com')).toQuery('mysql');
        const mssqlQuery = mysql.select(user.id).from(user).where(user.email.equals('brian.m.carlson@gmail.com')).toQuery('mssql');
        const oracleQuery = oracle.select(user.id).from(user).where(user.email.equals('brian.m.carlson@gmail.com')).toQuery('oracle');

        const values = ['brian.m.carlson@gmail.com'];
        assert.strictEqual(sqliteQuery.text, 'SELECT "user"."id" FROM "user" WHERE ("user"."email" = $1)');
        assert.deepEqual(sqliteQuery.values, values);

        assert.strictEqual(postgresQuery.text, 'SELECT "user"."id" FROM "user" WHERE ("user"."email" = $1)');
        assert.deepEqual(postgresQuery.values, values);

        assert.strictEqual(mysqlQuery.text, 'SELECT `user`.`id` FROM `user` WHERE (`user`.`email` = ?)');
        assert.deepEqual(mysqlQuery.values, values);

        assert.strictEqual(mssqlQuery.text, 'SELECT [user].[id] FROM [user] WHERE ([user].[email] = @1)');
        assert.deepEqual(mssqlQuery.values, values);

        assert.strictEqual(oracleQuery.text, 'SELECT "user"."id" FROM "user" WHERE ("user"."email" = :1)');
        assert.deepEqual(oracleQuery.values, values);
    });

    test('override dialect for toQuery using invalid dialect name', function ()
    {
        const query = sql.select(user.id).from(user);
        assert.throws(function ()
        {
            query.toQuery('invalid');
        });
    });

    test('using named queries with toNamedQuery', function ()
    {
        const query = sql.select(user.id).from(user).where(user.email.equals('brian.m.carlson@gmail.com')).toNamedQuery('users');
        assert.strictEqual(query.text, 'SELECT "user"."id" FROM "user" WHERE ("user"."email" = $1)');
        assert.strictEqual(query.values[0], 'brian.m.carlson@gmail.com');
        assert.strictEqual(query.name, 'users');
    });

    test('provide an empty query name for toNamedQuery', function ()
    {
        const query = sql.select(user.id).from(user);
        assert.throws(function ()
        {
            query.toNamedQuery('');
        });
    });

    test('provide an undefined query name for toNamedQuery', function ()
    {
        const query = sql.select(user.id).from(user);
        assert.throws(function ()
        {
            query.toNamedQuery();
        });
    });

    test('override dialect for toNamedQuery using dialect name', function ()
    {
        const mysql = new Sql('mysql');
        const postgres = new Sql('postgres');
        const sqlite = new Sql('sqlite');
        const mssql = new Sql('mssql');
        const oracle = new Sql('oracle');

        const sqliteQuery = mysql.select(user.id).from(user).where(user.email.equals('brian.m.carlson@gmail.com')).toNamedQuery('user.select_brian', 'sqlite');
        const postgresQuery = sqlite.select(user.id).from(user).where(user.email.equals('brian.m.carlson@gmail.com')).toNamedQuery('user.select_brian', 'postgres');
        const mysqlQuery = postgres.select(user.id).from(user).where(user.email.equals('brian.m.carlson@gmail.com')).toNamedQuery('user.select_brian', 'mysql');
        const oracleQuery = mssql.select(user.id).from(user).where(user.email.equals('brian.m.carlson@gmail.com')).toNamedQuery('user.select_brian', 'oracle');
        const mssqlQuery = oracle.select(user.id).from(user).where(user.email.equals('brian.m.carlson@gmail.com')).toNamedQuery('user.select_brian', 'mssql');


        const values = ['brian.m.carlson@gmail.com'];
        assert.strictEqual(sqliteQuery.text, 'SELECT "user"."id" FROM "user" WHERE ("user"."email" = $1)');
        assert.deepEqual(sqliteQuery.values, values);
        assert.strictEqual('user.select_brian', sqliteQuery.name);

        assert.strictEqual(postgresQuery.text, 'SELECT "user"."id" FROM "user" WHERE ("user"."email" = $1)');
        assert.deepEqual(postgresQuery.values, values);
        assert.strictEqual('user.select_brian', postgresQuery.name);

        assert.strictEqual(mysqlQuery.text, 'SELECT `user`.`id` FROM `user` WHERE (`user`.`email` = ?)');
        assert.deepEqual(mysqlQuery.values, values);
        assert.strictEqual('user.select_brian', mysqlQuery.name);

        assert.strictEqual(mssqlQuery.text, 'SELECT [user].[id] FROM [user] WHERE ([user].[email] = @1)');
        assert.deepEqual(mssqlQuery.values, values);
        assert.strictEqual('user.select_brian', mssqlQuery.name);

        assert.strictEqual(oracleQuery.text, 'SELECT "user"."id" FROM "user" WHERE ("user"."email" = :1)');
        assert.deepEqual(oracleQuery.values, values);
        assert.strictEqual('user.select_brian', oracleQuery.name);

    });

    test('override dialect for toNamedQuery using invalid dialect name', function ()
    {
        const query = sql.select(user.id).from(user);
        assert.throws(function ()
        {
            query.toNamedQuery('name', 'invalid');
        });
    });

    test('mssql default parameter place holder is @index', function ()
    {
        const mssql = new Sql('mssql');
        const query = mssql.select(user.id).from(user).where(user.email.equals('x@y.com')).toQuery();
        assert.strictEqual(query.text, 'SELECT [user].[id] FROM [user] WHERE ([user].[email] = @1)');
        assert.strictEqual(query.values[0], 'x@y.com');
    });

    test('mssql override default parameter placeholder with ?', function ()
    {
        const mssql = new Sql('mssql', {questionMarkParameterPlaceholder: true});
        const query = mssql.select(user.id).from(user).where(user.email.equals('x@y.com')).toQuery();
        assert.strictEqual(query.text, 'SELECT [user].[id] FROM [user] WHERE ([user].[email] = ?)');
        assert.strictEqual(query.values[0], 'x@y.com');
    });

});
