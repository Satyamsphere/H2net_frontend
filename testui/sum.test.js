// npm test

import sum from './sum.js';

test('properly add number', ()=>{

    expect(sum(1,2))
    .toBe(3)
})