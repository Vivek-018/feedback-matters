import { Message } from "@/model/User";

export interface ApiResponse{
    success:boolean;
    message:string;
    isAccetptingMessages?:boolean
    messages?:Array<Message>
}