import assert from 'assert'
import {ValueExpressionMixin as valueExpressionMixin} from '../node/valueExpression';
import {suite, test} from 'mocha'

var {Node} = require(__dirname + './../node');

suite('value-expression', function ()
{
    test("value expression mixin should not overwrite Node prototype properties", function ()
    {
        var mixin = valueExpressionMixin();

        // make sure that the node class doesn't have any conflicting properties
        for (var key in mixin)
        {
            if (mixin.hasOwnProperty(key))
            {
                assert.strictEqual(Node.prototype[key], undefined);
            }
        }
    });
});
