import User from '../models/user';
import Daily from '../models/Daily';
import token from '../services/token';

export default {
  loginRequired: (req, res, next) => {
    if (!req.header('Authorization')) return res.status(401).send({message: 'Please make sure your request has an Authorization header.'});
    
    // Validate jwt
    let try_token = req.header('Authorization').split(' ')[0];
    token.verifyToken(try_token, (err, payload) => {
      if (err) return res.status(401).send(err);
      // Daily.findOne().exec((err, Daily) => {
      //     if (err || !Daily) {
      //         return res.status(404).send(err || {
      //             error: 'middleware Daily not found!!!'
      //         });
      //     }
      //     // delete Daily.password;
      //     req.Daily = Daily;
      //     console.log('==================')
      //     console.log(req.Daily)
      //     console.log('==================')
      //     next();
      //   })
      User.findById(payload.sub)
        .exec((err, user) => {
          if (err || !user) {
              return res.status(404).send(err || {
                  error: 'middleware User not found!!!'
              });
          }
          delete user.password;
          req.user = user;
          next();
        })
    })
  }
}