import express from "express";
import usersBl from "../business-logic/users-bl.js";
import generalSetting from "../common/config.js";
import { checkPassword, checkResultStatus } from "../common/helper.js";
import CryptoJS from "crypto-js";
import connection from "../common/database.js";
const usersRouter = express.Router();

usersRouter.post(`${generalSetting.baseUrl}/auth`, function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], 
      function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				
				response.send('sucess');
			} else {
        response.status(401);
				response.send('Incorrect Username and/or Password!');
        
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

usersRouter.get(`${generalSetting.baseUrl}/status`,(req,res)=>{
  if (req.session.loggedin) {
		// Output username
		res.send('Welcome back, ' + req.session.username + '!');
	} else {
		// Not logged in
		res.send('Please login to view this page!');
	}
	res.end();
})

usersRouter.get(`${generalSetting.baseUrl}/users`, async (req, res) => {
  const getResult = await usersBl.getAll();
  if (!checkResultStatus(getResult)) {
    return res.status(500).send(getResult);
  } else {
    return res.send(getResult.data);
  }
});

usersRouter.get(`${generalSetting.baseUrl}/users/:username`, async (req, res) => {
  const username = req.params.username;

  const getUserResult = await usersBl.getUserBy(username);
  if (!checkResultStatus(getUserResult)) {
    return res.status(500).send(getUserResult);
  } else {
    return res.send(getUserResult.data);
  }
});

// authentification Login 

usersRouter.post(
  `${generalSetting.baseUrl}/users/:username/:pass`,
  async (req, res) => {
    const username = req.params.username;
    const password = CryptoJS.AES.encrypt(
      req.params.pass,
      generalSetting.CRYPTOJS_KEY
    ).toString();
    try {
      const getUserResult = await usersBl.getUserBy(username);

      if (!checkResultStatus(getUserResult)) {
        return res.status(500).send(getUserResult);
      } else {
        if (checkPassword(password, getUserResult.data[0].password)) {
          return res.send(getUserResult.data);
        } else {
          return res.json("Invalid Credentials");
        }
      }
    } catch (error) {
      return res.json("Invalid Credentials");
    }
  }
);

   usersRouter.delete('/users/:id', async (req, res) => {
    let result = await deleteUser(req.params.id);

     if (!result.success) {
         res.status(500).send(result)
     } else {
         res.send(result)
    }
 })

usersRouter.post(`${generalSetting.baseUrl}/users`, async (req, res) => {
  const body = req.body;
  const postResult = await usersBl.addUser(body);

  if (!checkResultStatus(postResult)) {
    return res.status(500).send(postResult);
  } else {
    postResult.data = {
      id: postResult.data.insertId,
      ...body,
    };
    return res.send(postResult.data);
  }
});



usersRouter.put(`${generalSetting.baseUrl}/users/:id`, async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const updateResult = await usersBl.updateUser(id, body);
  if (!checkResultStatus(updateResult)) {
    return res.status(500).send(updateResult);
  } else {
    updateResult.data = {
      id,
      ...body,
    };
    return res.send(updateResult.data);
  }
});

export default usersRouter;
