import {Harness} from './support'

var customer = Harness.defineCustomerTable();
var customerAlias = Harness.defineCustomerAliasTable();

// Cast columns.
Harness.test({
    query: customer.select(customer.age.cast('int')),
    pg: {
        text: 'SELECT CAST("customer"."age" AS int) FROM "customer"',
        string: 'SELECT CAST("customer"."age" AS int) FROM "customer"'
    },
    sqlite: {
        text: 'SELECT CAST("customer"."age" AS int) FROM "customer"',
        string: 'SELECT CAST("customer"."age" AS int) FROM "customer"'
    },
    mysql: {
        text: 'SELECT CAST(`customer`.`age` AS int) FROM `customer`',
        string: 'SELECT CAST(`customer`.`age` AS int) FROM `customer`'
    },
    mssql: {
        text: 'SELECT CAST([customer].[age] AS int) FROM [customer]',
        string: 'SELECT CAST([customer].[age] AS int) FROM [customer]'
    },
    oracle: {
        text: 'SELECT CAST("customer"."age" AS int) FROM "customer"',
        string: 'SELECT CAST("customer"."age" AS int) FROM "customer"'
    },
    params: []
});

Harness.test({
    query: customer.select(customer.name.cast('varchar(10)')),
    pg: {
        text: 'SELECT CAST("customer"."name" AS varchar(10)) FROM "customer"',
        string: 'SELECT CAST("customer"."name" AS varchar(10)) FROM "customer"'
    },
    sqlite: {
        text: 'SELECT CAST("customer"."name" AS varchar(10)) FROM "customer"',
        string: 'SELECT CAST("customer"."name" AS varchar(10)) FROM "customer"'
    },
    mysql: {
        text: 'SELECT CAST(`customer`.`name` AS varchar(10)) FROM `customer`',
        string: 'SELECT CAST(`customer`.`name` AS varchar(10)) FROM `customer`'
    },
    mssql: {
        text: 'SELECT CAST([customer].[name] AS varchar(10)) FROM [customer]',
        string: 'SELECT CAST([customer].[name] AS varchar(10)) FROM [customer]'
    },
    oracle: {
        text: 'SELECT CAST("customer"."name" AS varchar(10)) FROM "customer"',
        string: 'SELECT CAST("customer"."name" AS varchar(10)) FROM "customer"'
    },
    params: []
});

// Cast binary expressions.
Harness.test({
    query: customer.select(customer.name.plus(customer.age).cast('varchar(15)')),
    pg: {
        text: 'SELECT CAST(("customer"."name" + "customer"."age") AS varchar(15)) FROM "customer"',
        string: 'SELECT CAST(("customer"."name" + "customer"."age") AS varchar(15)) FROM "customer"'
    },
    sqlite: {
        text: 'SELECT CAST(("customer"."name" + "customer"."age") AS varchar(15)) FROM "customer"',
        string: 'SELECT CAST(("customer"."name" + "customer"."age") AS varchar(15)) FROM "customer"'
    },
    mysql: {
        text: 'SELECT CAST((`customer`.`name` + `customer`.`age`) AS varchar(15)) FROM `customer`',
        string: 'SELECT CAST((`customer`.`name` + `customer`.`age`) AS varchar(15)) FROM `customer`'
    },
    mssql: {
        text: 'SELECT CAST(([customer].[name] + [customer].[age]) AS varchar(15)) FROM [customer]',
        string: 'SELECT CAST(([customer].[name] + [customer].[age]) AS varchar(15)) FROM [customer]'
    },
    oracle: {
        text: 'SELECT CAST(("customer"."name" + "customer"."age") AS varchar(15)) FROM "customer"',
        string: 'SELECT CAST(("customer"."name" + "customer"."age") AS varchar(15)) FROM "customer"'
    },
    params: []
});

// Cast cast expressions.
Harness.test({
    query: customer.select(customer.name.cast('varchar(15)').cast('varchar(10)')),
    pg: {
        text: 'SELECT CAST(CAST("customer"."name" AS varchar(15)) AS varchar(10)) FROM "customer"',
        string: 'SELECT CAST(CAST("customer"."name" AS varchar(15)) AS varchar(10)) FROM "customer"'
    },
    sqlite: {
        text: 'SELECT CAST(CAST("customer"."name" AS varchar(15)) AS varchar(10)) FROM "customer"',
        string: 'SELECT CAST(CAST("customer"."name" AS varchar(15)) AS varchar(10)) FROM "customer"'
    },
    mysql: {
        text: 'SELECT CAST(CAST(`customer`.`name` AS varchar(15)) AS varchar(10)) FROM `customer`',
        string: 'SELECT CAST(CAST(`customer`.`name` AS varchar(15)) AS varchar(10)) FROM `customer`'
    },
    mssql: {
        text: 'SELECT CAST(CAST([customer].[name] AS varchar(15)) AS varchar(10)) FROM [customer]',
        string: 'SELECT CAST(CAST([customer].[name] AS varchar(15)) AS varchar(10)) FROM [customer]'
    },
    oracle: {
        text: 'SELECT CAST(CAST("customer"."name" AS varchar(15)) AS varchar(10)) FROM "customer"',
        string: 'SELECT CAST(CAST("customer"."name" AS varchar(15)) AS varchar(10)) FROM "customer"'
    },
    params: []
});

// Cast in WHERE.
Harness.test({
    query: customer.select(customer.name).where(customer.age.cast('int').plus(100).equals(150)),
    pg: {
        text: 'SELECT "customer"."name" FROM "customer" WHERE ((CAST("customer"."age" AS int) + $1) = $2)',
        string: 'SELECT "customer"."name" FROM "customer" WHERE ((CAST("customer"."age" AS int) + 100) = 150)'
    },
    sqlite: {
        text: 'SELECT "customer"."name" FROM "customer" WHERE ((CAST("customer"."age" AS int) + $1) = $2)',
        string: 'SELECT "customer"."name" FROM "customer" WHERE ((CAST("customer"."age" AS int) + 100) = 150)'
    },
    mysql: {
        text: 'SELECT `customer`.`name` FROM `customer` WHERE ((CAST(`customer`.`age` AS int) + ?) = ?)',
        string: 'SELECT `customer`.`name` FROM `customer` WHERE ((CAST(`customer`.`age` AS int) + 100) = 150)'
    },
    mssql: {
        text: 'SELECT [customer].[name] FROM [customer] WHERE ((CAST([customer].[age] AS int) + @1) = @2)',
        string: 'SELECT [customer].[name] FROM [customer] WHERE ((CAST([customer].[age] AS int) + 100) = 150)'
    },
    oracle: {
        text: 'SELECT "customer"."name" FROM "customer" WHERE ((CAST("customer"."age" AS int) + :1) = :2)',
        string: 'SELECT "customer"."name" FROM "customer" WHERE ((CAST("customer"."age" AS int) + 100) = 150)'
    },
    params: [100, 150]
});

// Alias cast.
Harness.test({
    query: customer.select(customer.age.cast('int').as('age_int')),
    pg: {
        text: 'SELECT CAST("customer"."age" AS int) AS "age_int" FROM "customer"',
        string: 'SELECT CAST("customer"."age" AS int) AS "age_int" FROM "customer"'
    },
    sqlite: {
        text: 'SELECT CAST("customer"."age" AS int) AS "age_int" FROM "customer"',
        string: 'SELECT CAST("customer"."age" AS int) AS "age_int" FROM "customer"'
    },
    mysql: {
        text: 'SELECT CAST(`customer`.`age` AS int) AS `age_int` FROM `customer`',
        string: 'SELECT CAST(`customer`.`age` AS int) AS `age_int` FROM `customer`'
    },
    mssql: {
        text: 'SELECT CAST([customer].[age] AS int) AS [age_int] FROM [customer]',
        string: 'SELECT CAST([customer].[age] AS int) AS [age_int] FROM [customer]'
    },
    oracle: {
        text: 'SELECT CAST("customer"."age" AS int) "age_int" FROM "customer"',
        string: 'SELECT CAST("customer"."age" AS int) "age_int" FROM "customer"'
    },
    params: []
});

// Cast Aliased columns.
Harness.test({
    query: customerAlias.select(customerAlias.age_alias.cast('int')),
    pg: {
        text: 'SELECT CAST("customer"."age" AS int) FROM "customer"',
        string: 'SELECT CAST("customer"."age" AS int) FROM "customer"'
    },
    sqlite: {
        text: 'SELECT CAST("customer"."age" AS int) FROM "customer"',
        string: 'SELECT CAST("customer"."age" AS int) FROM "customer"'
    },
    mysql: {
        text: 'SELECT CAST(`customer`.`age` AS int) FROM `customer`',
        string: 'SELECT CAST(`customer`.`age` AS int) FROM `customer`'
    },
    mssql: {
        text: 'SELECT CAST([customer].[age] AS int) FROM [customer]',
        string: 'SELECT CAST([customer].[age] AS int) FROM [customer]'
    },
    oracle: {
        text: 'SELECT CAST("customer"."age" AS int) FROM "customer"',
        string: 'SELECT CAST("customer"."age" AS int) FROM "customer"'
    },
    params: []
});

Harness.test({
    query: customerAlias.select(customerAlias.name_alias.cast('varchar(10)')),
    pg: {
        text: 'SELECT CAST("customer"."name" AS varchar(10)) FROM "customer"',
        string: 'SELECT CAST("customer"."name" AS varchar(10)) FROM "customer"'
    },
    sqlite: {
        text: 'SELECT CAST("customer"."name" AS varchar(10)) FROM "customer"',
        string: 'SELECT CAST("customer"."name" AS varchar(10)) FROM "customer"'
    },
    mysql: {
        text: 'SELECT CAST(`customer`.`name` AS varchar(10)) FROM `customer`',
        string: 'SELECT CAST(`customer`.`name` AS varchar(10)) FROM `customer`'
    },
    mssql: {
        text: 'SELECT CAST([customer].[name] AS varchar(10)) FROM [customer]',
        string: 'SELECT CAST([customer].[name] AS varchar(10)) FROM [customer]'
    },
    oracle: {
        text: 'SELECT CAST("customer"."name" AS varchar(10)) FROM "customer"',
        string: 'SELECT CAST("customer"."name" AS varchar(10)) FROM "customer"'
    },
    params: []
});
// Cast binary expressions for Aliased Column.
Harness.test({
    query: customerAlias.select(customerAlias.name_alias.plus(customerAlias.age_alias).cast('varchar(15)')),
    pg: {
        text: 'SELECT CAST(("customer"."name" + "customer"."age") AS varchar(15)) FROM "customer"',
        string: 'SELECT CAST(("customer"."name" + "customer"."age") AS varchar(15)) FROM "customer"'
    },
    sqlite: {
        text: 'SELECT CAST(("customer"."name" + "customer"."age") AS varchar(15)) FROM "customer"',
        string: 'SELECT CAST(("customer"."name" + "customer"."age") AS varchar(15)) FROM "customer"'
    },
    mysql: {
        text: 'SELECT CAST((`customer`.`name` + `customer`.`age`) AS varchar(15)) FROM `customer`',
        string: 'SELECT CAST((`customer`.`name` + `customer`.`age`) AS varchar(15)) FROM `customer`'
    },
    mssql: {
        text: 'SELECT CAST(([customer].[name] + [customer].[age]) AS varchar(15)) FROM [customer]',
        string: 'SELECT CAST(([customer].[name] + [customer].[age]) AS varchar(15)) FROM [customer]'
    },
    oracle: {
        text: 'SELECT CAST(("customer"."name" + "customer"."age") AS varchar(15)) FROM "customer"',
        string: 'SELECT CAST(("customer"."name" + "customer"."age") AS varchar(15)) FROM "customer"'
    },
    params: []
});

// Cast cast expressions for aliased columns.
Harness.test({
    query: customerAlias.select(customerAlias.name_alias.cast('varchar(15)').cast('varchar(10)')),
    pg: {
        text: 'SELECT CAST(CAST("customer"."name" AS varchar(15)) AS varchar(10)) FROM "customer"',
        string: 'SELECT CAST(CAST("customer"."name" AS varchar(15)) AS varchar(10)) FROM "customer"'
    },
    sqlite: {
        text: 'SELECT CAST(CAST("customer"."name" AS varchar(15)) AS varchar(10)) FROM "customer"',
        string: 'SELECT CAST(CAST("customer"."name" AS varchar(15)) AS varchar(10)) FROM "customer"'
    },
    mysql: {
        text: 'SELECT CAST(CAST(`customer`.`name` AS varchar(15)) AS varchar(10)) FROM `customer`',
        string: 'SELECT CAST(CAST(`customer`.`name` AS varchar(15)) AS varchar(10)) FROM `customer`'
    },
    mssql: {
        text: 'SELECT CAST(CAST([customer].[name] AS varchar(15)) AS varchar(10)) FROM [customer]',
        string: 'SELECT CAST(CAST([customer].[name] AS varchar(15)) AS varchar(10)) FROM [customer]'
    },
    oracle: {
        text: 'SELECT CAST(CAST("customer"."name" AS varchar(15)) AS varchar(10)) FROM "customer"',
        string: 'SELECT CAST(CAST("customer"."name" AS varchar(15)) AS varchar(10)) FROM "customer"'
    },
    params: []
});

// Cast in WHERE for aliased columns.
Harness.test({
    query: customerAlias.select(customerAlias.name_alias).where(customerAlias.age_alias.cast('int').plus(100).equals(150)),
    pg: {
        text: 'SELECT "customer"."name" AS "name_alias" FROM "customer" WHERE ((CAST("customer"."age" AS int) + $1) = $2)',
        string: 'SELECT "customer"."name" AS "name_alias" FROM "customer" WHERE ((CAST("customer"."age" AS int) + 100) = 150)'
    },
    sqlite: {
        text: 'SELECT "customer"."name" AS "name_alias" FROM "customer" WHERE ((CAST("customer"."age" AS int) + $1) = $2)',
        string: 'SELECT "customer"."name" AS "name_alias" FROM "customer" WHERE ((CAST("customer"."age" AS int) + 100) = 150)'
    },
    mysql: {
        text: 'SELECT `customer`.`name` AS `name_alias` FROM `customer` WHERE ((CAST(`customer`.`age` AS int) + ?) = ?)',
        string: 'SELECT `customer`.`name` AS `name_alias` FROM `customer` WHERE ((CAST(`customer`.`age` AS int) + 100) = 150)'
    },
    mssql: {
        text: 'SELECT [customer].[name] AS [name_alias] FROM [customer] WHERE ((CAST([customer].[age] AS int) + @1) = @2)',
        string: 'SELECT [customer].[name] AS [name_alias] FROM [customer] WHERE ((CAST([customer].[age] AS int) + 100) = 150)'
    },
    oracle: {
        text: 'SELECT "customer"."name" "name_alias" FROM "customer" WHERE ((CAST("customer"."age" AS int) + :1) = :2)',
        string: 'SELECT "customer"."name" "name_alias" FROM "customer" WHERE ((CAST("customer"."age" AS int) + 100) = 150)'
    },
    params: [100, 150]
});

// Alias cast.
Harness.test({
    query: customerAlias.select(customerAlias.age_alias.cast('int').as('age_int')),
    pg: {
        text: 'SELECT CAST("customer"."age" AS int) AS "age_int" FROM "customer"',
        string: 'SELECT CAST("customer"."age" AS int) AS "age_int" FROM "customer"'
    },
    sqlite: {
        text: 'SELECT CAST("customer"."age" AS int) AS "age_int" FROM "customer"',
        string: 'SELECT CAST("customer"."age" AS int) AS "age_int" FROM "customer"'
    },
    mysql: {
        text: 'SELECT CAST(`customer`.`age` AS int) AS `age_int` FROM `customer`',
        string: 'SELECT CAST(`customer`.`age` AS int) AS `age_int` FROM `customer`'
    },
    mssql: {
        text: 'SELECT CAST([customer].[age] AS int) AS [age_int] FROM [customer]',
        string: 'SELECT CAST([customer].[age] AS int) AS [age_int] FROM [customer]'
    },
    oracle: {
        text: 'SELECT CAST("customer"."age" AS int) "age_int" FROM "customer"',
        string: 'SELECT CAST("customer"."age" AS int) "age_int" FROM "customer"'
    },
    params: []
});
