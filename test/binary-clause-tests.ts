import assert from 'assert'
import {Table} from '../table';
import {test} from 'mocha'

interface ceshi
{
    baz: string,
    bar: string
}

let Foo = Table.define<'foo', ceshi>({
    name: 'foo',
    schema: 'dd',
    columns: {
        bar: {dataType: 'string'},
        baz: {dataType: 'st'}
    }
});

test('operators', function ()
{
    assert.strictEqual(Foo.baz.equals(1).operator, '=');
    assert.strictEqual(Foo.baz.equals(1).operator, '=');
    assert.strictEqual(Foo.baz.notEquals(1).operator, '<>');
    assert.strictEqual(Foo.baz.notEquals(1).operator, '<>');
    assert.strictEqual(Foo.baz.like('asdf').operator, 'LIKE');
    assert.strictEqual(Foo.baz.notLike('asdf').operator, 'NOT LIKE');
    assert.strictEqual(Foo.baz.isNull().operator, 'IS NULL');
    assert.strictEqual(Foo.baz.isNotNull().operator, 'IS NOT NULL');
    assert.strictEqual(Foo.baz.gt(1).operator, '>');
    assert.strictEqual(Foo.baz.gte(1).operator, '>=');
    assert.strictEqual(Foo.baz.lt(1).operator, '<');
    assert.strictEqual(Foo.baz.lte(1).operator, '<=');
    assert.strictEqual(Foo.baz.plus(1).operator, '+');
    assert.strictEqual(Foo.baz.minus(1).operator, '-');
    assert.strictEqual(Foo.baz.multiply(1).operator, '*');
    assert.strictEqual(Foo.baz.leftShift(1).operator, '<<');
    assert.strictEqual(Foo.baz.rightShift(1).operator, '>>');
    assert.strictEqual(Foo.baz.bitwiseAnd(1).operator, '&');
    assert.strictEqual(Foo.baz.bitwiseNot(1).operator, '~');
    assert.strictEqual(Foo.baz.bitwiseOr(1).operator, '|');
    assert.strictEqual(Foo.baz.bitwiseXor(1).operator, '#');
    assert.strictEqual(Foo.baz.divide(1).operator, '/');
    assert.strictEqual(Foo.baz.modulo(1).operator, '%');
    assert.strictEqual(Foo.baz.regex(1).operator, '~');
    assert.strictEqual(Foo.baz.iregex(1).operator, '~*');
    assert.strictEqual(Foo.baz.notRegex(1).operator, '!~');
    assert.strictEqual(Foo.baz.notIregex(1).operator, '!~*');
    assert.strictEqual(Foo.baz.regexp(1).operator, 'REGEXP');
    assert.strictEqual(Foo.baz.rlike(1).operator, 'RLIKE');
    assert.strictEqual(Foo.baz.ilike('asdf').operator, 'ILIKE');
    assert.strictEqual(Foo.baz.notIlike('asdf').operator, 'NOT ILIKE');
    assert.strictEqual(Foo.baz.match('asdf').operator, '@@');
});
