const accountmodel = require("../models/accounts.model");

async function accountcreatingcontroller(request, response) {
  const user = request.user;
  const createaccount = await accountmodel.create({
    user: user.id,
  });

  response.status(201).json({
    message: "account is created by passing the middleware test cases",
    account: createaccount,
  });
}

module.exports = { accountcreatingcontroller };
