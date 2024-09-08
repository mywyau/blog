export interface UserData {
    id: number,
    user_id: string,
    user_type: string,
    username: string,
    password: string,
    email: string,
    created_at: Date;
    updated_at: Date;
}


export interface CreateUserFormData {
    user_id: string,
    user_type: string,
    username: string,
    password: string,
    email: string,
    created_at: Date;
    updated_at: Date;
}
