interface User {
    _id: string,
    email: string,
    fullName: string,
    password: string,
    profilePic?: string,
    createdAt?: string,
    updatedAt?: string,
}

interface Message {
    _id: string,
    senderId: string,
    receiverId: string,
    text?: string,
    image?: string,
    createdAt?: string,
    updatedAt?: string,
}