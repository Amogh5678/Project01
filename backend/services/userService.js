import userModel from '../models/userModel.js'

//this function has one job only it creates the user
export const createUser = async({ //when you export like this you have to use { } while importing anywhere
    email, firstname, lastname, password
})=>{
    if(!email || !firstname || !password)
        { 
    throw new Error("All fields are required");
        }

     const user = await userModel.create({
            fullname:{
                firstname,
                lastname,
            },
                email,
                password
            
        });
        return user;
}

//export default userService;
// const userService = { createUser };
// export default userService;