import bcrypt from 'bcryptjs'

const users =[
    {
        name:'Admin user',
        email:'admin@emart.com',
        password:bcrypt.hashSync('123',10),
        isAdmin:true
    },
    {
        name:'mony',
        email:'pta@gmail.com',
        password:bcrypt.hashSync('123',10)
    },
    {
        name:'john',
        email:'john@gmail.com',
        password:bcrypt.hashSync('123',10)
    }
]

export default users