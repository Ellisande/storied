import Examples from '../../../src/models/examples';
import {
  expect
} from 'chai';
describe('examples', () => {
  describe('constructor', () => {
    it('should be able to create an Examples from just variable names', () => {
      const columns = ['name', 'age'];
      const exampleTable = new Examples(columns);
      expect(exampleTable).to.be.ok;
      expect(exampleTable.headings).to.deep.equal(columns);
      expect(exampleTable.headings).not.to.equal(columns);
    });

    it('should throw an error if an array of variable names is not provided', done => {
      try {
        new Examples();
      } catch (err) {
        expect(err).to.be.ok;
        return done();
      }
      return done('Expected error from constructor');
    });

    it('should accept variable names and a set of rows', () => {
      const rows = [
        ['Justin', 31],
        ['Kristin', 31],
        ['Liam', 3]
      ];
      const columns = ['name', 'age'];
      const exampleTable = new Examples(columns, rows);
      expect(exampleTable).to.be.ok;

      expect(exampleTable.headings).not.to.equal(columns);
      expect(exampleTable.headings).to.deep.equal(columns);

      expect(exampleTable.getRow(0)).to.deep.equal({
        name: 'Justin',
        age: 31
      });
      expect(exampleTable.getRow(1)).to.deep.equal({
        name: 'Kristin',
        age: 31
      });
      expect(exampleTable.getRow(2)).to.deep.equal({
        name: 'Liam',
        age: 3
      });
    });

    describe('forEach', () => {
      it('should be able to iterate over each row as an object', () => {
        const rows = [
          ['Justin', 31],
          ['Kristin', 31],
          ['Liam', 3]
        ];
        const columns = ['name', 'age'];
        const exampleTable = new Examples(columns, rows);
        var counter = 0;
        exampleTable.forEach(row => {
          expect(row).to.be.ok;
          expect(row.name).to.be.ok;
          expect(row.age).to.be.ok;
          counter++;
        });
        expect(counter).to.equal(3);
      });
    });
    describe('getRow', () => {
      it('should return the row as an object with headings of keys', () => {
        const rows = [
          ['Justin', 31],
          ['Kristin', 31],
          ['Liam', 3]
        ];
        const columns = ['name', 'age'];
        const exampleTable = new Examples(columns, rows);
        expect(exampleTable).to.be.ok;

        expect(exampleTable.headings).not.to.equal(columns);
        expect(exampleTable.headings).to.deep.equal(columns);

        expect(exampleTable.getRow(0)).to.deep.equal({
          name: 'Justin',
          age: 31
        });
        expect(exampleTable.getRow(1)).to.deep.equal({
          name: 'Kristin',
          age: 31
        });
        expect(exampleTable.getRow(2)).to.deep.equal({
          name: 'Liam',
          age: 3
        });
      });
    });

    describe('addRow', () => {
      it('should add a new row with the provided values', () => {
        const row = ['Justin', 31];
        const columns = ['name', 'age'];
        const exampleTable = new Examples(columns);
        const exampleTableWithRow = exampleTable.addRow(row);
        expect(exampleTableWithRow).not.to.equal(exampleTable);
        expect(exampleTableWithRow.length).to.equal(1);
        expect(exampleTableWithRow.getRow(0)).to.deep.equal({
          name: 'Justin',
          age: 31
        });
      });

      it('should throw an error if too many values are given', () => {
        const badRow = ['Justin', 31, 'crazy'];
        const columns = ['name', 'age'];
        const exampleTable = new Examples(columns);
        expect(exampleTable.addRow.bind(exampleTable, badRow)).to.throw(/Too many values/);
      });

      it('should be happy with less values than columns', () => {
        const row = ['Justin'];
        const columns = ['name', 'age'];
        const exampleTable = new Examples(columns);
        const exampleTableWithRow = exampleTable.addRow(row);
        expect(exampleTableWithRow).not.to.equal(exampleTable);
        expect(exampleTableWithRow.length).to.equal(1);
        expect(exampleTableWithRow.getRow(0)).to.deep.equal({
          name: 'Justin',
          age: undefined
        });
      });
    });
  });
});
