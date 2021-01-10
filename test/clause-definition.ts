import assert from 'assert'
import {Node} from '../node/index'
import {test} from 'mocha'

var Bang = Node.define({
    type: 'SELECT'
});

var Boom = Node.define({
    constructor: function (n)
    {
        Node.call(this);
        this.name = n;
    }
});

test('clause definition', function ()
{
    var select = new Bang();
    assert.strictEqual(select.type, 'SELECT');
    assert.strictEqual(select.nodes.length, 0);

    var q = new Boom('hai');
    assert.strictEqual(q.nodes.length, 0);
    var q2 = new Boom('bai');
    q.nodes.push(1);
    assert.strictEqual(q.nodes.length, 1);
    assert.strictEqual(q.name, 'hai');
    assert.strictEqual(q2.nodes.length, 0);
    assert.strictEqual(q2.name, 'bai');
});
