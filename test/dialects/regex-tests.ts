import {Harness} from './support'
import Sql from './../../index'

var customer = Harness.defineCustomerTable();

Sql.setDialect('postgres');

Harness.test({
    query: customer.select(customer.metadata.regex('age')),
    pg: {
        text: 'SELECT ("customer"."metadata" ~ $1) FROM "customer"',
        string: 'SELECT ("customer"."metadata" ~ \'age\') FROM "customer"'
    },
    params: ['age']
});

Harness.test({
    query: customer.select(customer.metadata.iregex('age')),
    pg: {
        text: 'SELECT ("customer"."metadata" ~* $1) FROM "customer"',
        string: 'SELECT ("customer"."metadata" ~* \'age\') FROM "customer"'
    },
    params: ['age']
});

Harness.test({
    query: customer.select(customer.metadata.notRegex('age')),
    pg: {
        text: 'SELECT ("customer"."metadata" !~ $1) FROM "customer"',
        string: 'SELECT ("customer"."metadata" !~ \'age\') FROM "customer"'
    },
    params: ['age']
});

Harness.test({
    query: customer.select(customer.metadata.notIregex('age')),
    pg: {
        text: 'SELECT ("customer"."metadata" !~* $1) FROM "customer"',
        string: 'SELECT ("customer"."metadata" !~* \'age\') FROM "customer"'
    },
    params: ['age']
});
