//import cloneArray from "./cloneArray"
const  cloneArray =require('./cloneArray.js')
test('should ', () => {
  const array = [1,2,3]
  expect(cloneArray(array)).toEqual(array);
  expect(cloneArray(array)).not.toBe(array);
})
