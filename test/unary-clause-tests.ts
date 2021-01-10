import assert from 'assert'
import {Table} from './../table';
import {test} from 'mocha'

var Foo = Table.define({
    name: 'foo',
    columns: ['baz', 'bar']
});

test('operators', function ()
{
    assert.strictEqual(Foo.bar.isNull().operator, 'IS NULL');
    assert.strictEqual(Foo.baz.isNotNull().operator, 'IS NOT NULL');
});
