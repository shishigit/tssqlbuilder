import assert from 'assert'
import {Select} from '../node/Ajiandannode';
import sql from './../index'
import {test} from 'mocha'

var select = new Select({sql: sql});

test('has SELECT type', function ()
{
    assert.strictEqual(select.type, 'SELECT');
});


test('can go toQuery', function ()
{
    assert.strictEqual(select.toQuery().text, 'SELECT ');
});
