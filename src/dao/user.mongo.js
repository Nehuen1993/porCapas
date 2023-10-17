import usersModel from './models/Users.js'

export default class User {
    constructor() {

    }

    get = async () => {
        let users = await usersModel.find()
        return users
    }
}