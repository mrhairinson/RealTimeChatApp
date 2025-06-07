import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../libs/cloudinary.js";
import { getReceiverSocketId, io } from './../libs/socket.js';

export const getUserForSideBar = async(req, res) => {
    try {
        const currentUserId = req.user._id;
        const filterUser = await User.find({_id: {$ne:currentUserId}}).select("-password"); //$ne find all users but not user with current _id, not include password
        res.status(200).json(filterUser);
    } catch (error) {
        console.log(`Interal Server Error Get User for Side Bar:\n${error}`);
        res.status(500).json(ERR.INTERNAL_SERVER_ERROR);
    }
}

export const getMessages = async(req, res) => { //Get messages between two different users
    try {
        const {id:receiverId} = req.params;
        const senderId =req.user._id;

        const msgs = await Message.find({
            $or: [
                {senderId: senderId, receiverId: receiverId},
                {senderId: receiverId, receiverId: senderId},
            ]
        });

        res.status(200).json(msgs);
    } catch (error) {
        console.log(`Interal Server Error get msg:\n${error}`);
        res.status(500).json(ERR.INTERNAL_SERVER_ERROR);
    }
}

export const sendMessage = async(req, res) => { //send messages between two different users
    try {
        const {id:receiverId} = req.params;
        const senderId = req.user._id;
        const {text, image} = req.body;
        let imageUrl;
        if (image) {
            //Upload to cloudinary
            const uploadRes = await cloudinary.uploader.upload(image);
            imageUrl = uploadRes.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })
        await newMessage.save();
        //get receiver socket ID
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json(newMessage);
    } catch (error) {
        console.log(`Interal Server Error Send Msg:\n${error}`);
        res.status(500).json(ERR.INTERNAL_SERVER_ERROR);
    }
}