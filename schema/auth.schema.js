import { User } from '../models/user.model'
import jwt from 'jsonwebtoken'
import { schemaComposer } from 'graphql-compose'
import config from '../config/config'

function login(email, password) {
    return new Promise((resolve, reject) => {
        User.findOne({ 'email': email}, (err, user) => {
            if (err || !user) {
                reject(new Error('No such email found'))
                return
            }
            user.comparePassword(password, async (err, isMatch) => {
                if (err) {
                    reject(new Error(err))
                    return
                }
                if (isMatch) {
                    user.lastLogin = Date.now()
                    user.save()
                    const token = jwt.sign({ userID: user.id }, config.jwtSecret)
                    let auth = { token:token, user:user }
                    resolve(auth)
                } else {
                    reject(new Error('Invalid password'))
                }
            })
        }) 
    })
}

const AuthTC = schemaComposer.createObjectTC(`
    type Authentication {
        token: String!
        user: User!
    }
`)

AuthTC.addResolver({
    kind: 'mutation',
    name: 'login',
    args: {
        email: 'String',
        password: 'String'
    },
    type: AuthTC,
    resolve: async ({ source, args }) => {
        try {
            const auth = await login(args.email, args.password)
            return {
                token: auth.token,
                user: auth.user
            } 
        } catch (err) {
            return err       
        }
    }
})

const AuthMutation = {
    userLogin: AuthTC.getResolver('login')
}

export { AuthMutation }