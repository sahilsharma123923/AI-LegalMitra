import { create } from "zustand";

export const ChatStore=create((set)=>({

    chats:[
        {
            id:1,
            title:"Consume Rights",
        },
        {
            id:2,
            title:"Property Dispute",
        },
        {
            id:3,
            title:"Employment Law"
        },
        {
            id:4,
            title:"Police & FIR"
        }
    ],
   
    currentChat:null,

    addChat:()=>{},

    deleteChat:()=>{},

    renameChat:()=>{}

}))