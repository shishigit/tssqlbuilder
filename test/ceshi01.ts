import assert from 'assert'
import { Select } from '../tssrc/select';

describe('Select', function ()
{
    describe('01', function ()
    {
        it('should return -1 when the value is not present', function ()
        {
            Select()
            assert.strictEqual([1, 2, 3].indexOf(4), -1);
        });
    });
});


