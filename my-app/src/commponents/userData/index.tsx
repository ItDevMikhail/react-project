import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IUserProps } from './../../models/iUser';

interface IUserDataProps {
    userData: IUserProps | undefined
}


export default function UserDataComponent({ userData }: IUserDataProps) {

    return (
        <>
            {userData?.login && <p>My login: <strong>{userData.login}</strong></p>}
            {userData?.name && <p>My name: <strong>{userData.name}</strong></p>}
            {userData?.name && <p>My lName: <strong>{userData.lastName}</strong></p>}
            {userData?.name && <p>My email: <strong>{userData.email}</strong></p>}
        </>
    )
}