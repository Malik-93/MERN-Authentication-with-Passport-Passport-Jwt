const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const PassportFacebookToken = require('passport-facebook-token')
const PassportFacebookStrategy = require('passport-facebook').Strategy
const User = require('../db/models/Users');
const Admin = require('../db/models/Admin')
const keys = require("../config/keys");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = passport => {
    //User JWT_STRATEGY
    passport.use(
        new JwtStrategy(opts, (jwt_payload, next) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return next(null, user);
                    }
                    return next(null, false);
                })
                .catch(err => console.log(err));
        })
    );

    // ADMIN JWT_STRATEGY

    passport.use(
        new JwtStrategy(opts, (jwt_payload, next) => {
            Admin.findById(jwt_payload.id)
                .then(admin => {
                    if (admin) {
                        return next(null, admin);
                    }
                    return next(null, false);
                })
                .catch(err => console.log(err));
        })
    );

    passport.use(new PassportFacebookToken({
        clientID: '343489216327951',
        clientSecret: '16c01d7f8a146b9e17845334126650b1',
    },
        async (accessToken, refreshToken, profile, next) => {
            try {
                console.log('profile', profile);
                console.log('accessToken', accessToken);
                console.log('refreshToken', refreshToken);
                const existingUser = await User.findOne({ fbId:  profile.id });
                if (existingUser) {
                    console.log('existingUser /*/*/*', existingUser)
                    return next(null, existingUser);
                }
                const newUser = new User({
                    fbId: profile.id,
                    fbName: profile.displayName,
                    fbEmail: profile.emails[0].value,
                });
                await newUser.save()
                next( null, newUser )
            } catch (error) {
                next(error, false, error.message);
            }
        }
    ))

    passport.use(new PassportFacebookStrategy({
        clientID: '343489216327951',
        clientSecret: '16c01d7f8a146b9e17845334126650b1',
        callbackURL: 'http://localhost:5000/api/users/auth/facebook/callback'
    },
    async (accessToken, refreshToken, profile, next) => {
        try {
            console.log('profile', profile);
            console.log('accessToken', accessToken);
            console.log('refreshToken', refreshToken);
            const existingUser = await User.findOne({ fbId: profile.id });
            if (existingUser) {
                console.log('existingUser', existingUser)
                return next(null, existingUser );
            }
            const newUser = new User({
                fbId: profile.id,
                fbName: profile.displayName,
                fbEmail: profile.emails[0].value,
            });
            await newUser.save()
            return next(null, newUser)
        } catch (error) {
            next(error, false, error.message);
        }
    }
    ))

    passport.serializeUser((user, next) => {
        next(null, user._id)
    });
    passport.deserializeUser((id, next) => {
        User.findById({ _id: id }, (err, user) => {
            if(err) {
                console.log('Deserialize user error :', err)
            }
            next(null, user)
        })
    })
};