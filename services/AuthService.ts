const userName = process.env.NEXT_PUBLIC_ADMIN_USERNAME!
const password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD!

export type UserCredentials = {
    userName: string,
    password: string
}

export function SignIn(user: UserCredentials){
    localStorage.removeItem('userRole');
    if(user.userName === userName && user.password === password){
        localStorage.setItem('userRole', 'admin')
    }
    else{
        localStorage.setItem('userRole', 'guest')
    }
}

export function CheckUserRole(){
    const userRole = localStorage.getItem('userRole');
    return userRole;
}