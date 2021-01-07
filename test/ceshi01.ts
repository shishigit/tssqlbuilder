import assert from 'assert'
import { Sql } from '../tssrc/sql';
import { Table } from '../tssrc/table';
describe('Array', function ()
{
    describe('#indexOf()', function ()
    {
        it('should return -1 when the value is not present', function ()
        {
            let table = new Table('test')
            Sql.insert().into(table).toQuery()
            assert.strictEqual([1, 2, 3].indexOf(4), -1);
        });
    });
});


