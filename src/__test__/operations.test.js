import {calucaluteCurrentResult} from '../utils/operations'

/*
* test to check whether Utils- Operantions methods are executed properly with the values provided
*
*/
describe('check the operation of 2 numbers', () => {
  it('sum of 2 and 4 must result in 6', () => {
      let sum = calucaluteCurrentResult('2', '+', '4');
      expect(sum).toBeDefined()
      expect(sum).toEqual('6')
  })
  it('difference of 5 and 3 must result in 2', () => {
      let diff = calucaluteCurrentResult('5', '-', '3');
      expect(diff).toBeDefined()
      expect(diff).toEqual('2')
  })
  it('product of 6 and 8 must result in 48', () => {
      let prod = calucaluteCurrentResult('6','x','8');
      expect(prod).toBeDefined()
      expect(prod).toEqual('48')
  })
  it('result of division of 64 by 4 must result in 16', () => {
      let div = calucaluteCurrentResult('64','/','4');
      expect(div).toBeDefined()
      expect(div).toEqual('16')
  })
})