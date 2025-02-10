To Run this App:- npm run dev
to run the test file via jest:- 
create sum.js file.
then sum.test.js file.

then run > npm test

for the final test go in package.json and change one line => 
"scripts": {
    "test": "jest"
  },

to this:-

 "scripts": {
    "test": "jest --coverage"
  },

then run > npm test