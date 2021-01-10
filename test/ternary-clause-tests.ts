import assert from 'assert'
import {Table} from './../table';
import {test} from 'mocha'

var Foo = Table.define({
    name: 'foo',
    columns: ['baz', 'bar']
});

test('operators', function ()
{
    assert.strictEqual(Foo.bar.between(1, 2).operator, 'BETWEEN');
    assert.strictEqual(Foo.baz.between(1, 2).separator, 'AND');
});
