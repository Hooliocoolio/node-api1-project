let users = [
    {
        id: "1",
        name: "Hoolio Osuna",
        bio: "Some dude that lives in cali"
    },
    {
        id: "2",
        name: "Britney Spears",
        bio: "Once upon a time she had a meltdown"
    },
    {
        id: "3",
        name: "Freddy Kruger",
        bio: "A burned killer with knives as fingers"
    }
]

/*  returns list of all users  */
function getUsers() {
    return users;
}

/*  returns a single user using params.id  */
function getUserById(id){
    return users.find(u => u.id === id)
}

/*  creates a new user then returns new user data  */
function createUser(data) {
    const payload = {
        id: String(users.length + 1),
        ...data,
    }
    users.push(payload)
        return payload
}

/*  Updates the users information  */
function updateUser(id, data) {
    const index = users.findIndex(u => u.id === id)
    users[index] = {
        ...users[index],
        ...data,
    }
    return users[index]
}

/*  deletes a user  */
function deleteUser(id) {
    users = users.filter(u => u.id != id)
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser, 
    deleteUser,
}



