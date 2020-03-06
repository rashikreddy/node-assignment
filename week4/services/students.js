var connection = require('../databaseconnection/connection.js');

const createUser = async (userdetails) => {
    var newuser = new connection.studentData(userdetails);
    const result = await newuser.save();
    return result;
}

const getUser = async (userdetails) => {
    var user = await connection.studentData.find({
        id: userdetails
    });
    return user;
}

const deleteUser = async (userdetails) => {
    var user = await  connection.studentData.remove({id:userdetails});
    return user;
}

const updateUser = async (id,data) =>{
    const user = await connection.studentData.find({id:id});
    if(data.name){
        user[0].set({name : data.name});
        await user[0].save();
    }
    if(data.department){
        user[0].set({department:data.department});
        await user[0].save();
    }
    if(data.email){
        user[0].save({department:data.department});
        await user[0].save();
    }
    return user;
}

module.exports = {
    createUser,
    getUser,
    deleteUser,
    updateUser
}