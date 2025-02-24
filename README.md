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


Authencation routers for all user login and registers:-
          <Route path="/login" element={<Login />} />
          <Route path="/userregister" element={<UserRegister />} />
          <Route path="/Adminregister" element={<AdminRegister />} />
          <Route path="/ProductManagerregister" element={<ProductManagerRegister />} />
          <Route path="/ProvisioningCoOrdinatorregister" element={<ProvisioningCoOrdinatorRegister />} />
          <Route path="/reset-password" element={<ResetPassword />} />