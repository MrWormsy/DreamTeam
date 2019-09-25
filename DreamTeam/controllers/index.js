// Go to Home
function goToHome(req, res) {
  res.render('index', {session : req.session, page : 1, menuId : 'about'});
}

// Sign In person

function goToSignUp(req, res) {
  // If the person is already logged in we redirect him to the home page
  if (typeof req.session.username !== 'undefined') {
    res.redirect('/home');
  // Else he can sign in
  } else {
    res.render('signup', {});
  }
}

function signUpPerson(req, res) {
  const crypto = require('crypto');
  let pass = crypto.createHash('md5').update(req.body.pass).digest("hex");
  let passconf = crypto.createHash('md5').update(req.body.passconf).digest("hex");

  if (pass == passconf) {

    const Account = require('../models');

    const newAccount = Account ({
      username: req.body.username,
      password : pass
    });

    newAccount.save(function(err) {
      if (err) throw err;

      //Store user's username into session
      Account.find({username : req.body.username},function(err,result) {
        if (err) throw err;
        req.session.username = req.body.username;

        res.end('done');
      });
    });

  } else {
    res.json({info : 'ERROR'});
  }
}

// Log In

function goToLogIn(req, res) {
  // If the person is already logged in we redirect him to the home page
  if (typeof req.session.username !== 'undefined') {
    res.redirect('/home');
  // Else he can log in
} else {
  res.render('login', {});
}
}

function logInPerson(req, res) {
  const crypto = require('crypto');
  let pass = crypto.createHash('md5').update(req.body.pass).digest("hex");

  const Account = require('../models');
  //Find user's username and password
  Account.find({username : req.body.username, password : pass},function(err,result) {
    if (err) throw err;
    
    if (result.length == 1) {
      req.session.username = req.body.username;
      res.end('done');
    } else {
      res.redirect('login');
      res.end('error');
    }    
  });
}

// Log Out 
function logOut(req, res) {
  req.session.destroy((err) => {
    if(err) {
      return console.log(err);
    }
    res.redirect('/');
  });
}

module.exports.goToHome = goToHome;
module.exports.goToSignUp = goToSignUp;
module.exports.signUpPerson = signUpPerson;
module.exports.goToLogIn = goToLogIn;
module.exports.logInPerson = logInPerson;
module.exports.logOut = logOut;