import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

export const addUser = () => {
  Meteor.methods({
    createNewUser: (newUserName, newUserEmail, newUserPwd) => {
      const SEED_USERNAME = `${newUserName}`
      const SEED_EMAIL = `${newUserEmail}`
      const SEED_PASSWORD = `${newUserPwd}`

      if (!Accounts.findUserByUsername(SEED_USERNAME)) {
        Accounts.createUser({
          username: SEED_USERNAME,
          email: SEED_EMAIL,
          password: SEED_PASSWORD,
        })

        console.log("New user created")

        let res = 'New user created' 
        return res
      }

      console.log('User already logged in')

      let res = 'User already logged in'
      return res
    }
  })
}