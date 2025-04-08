'use client'
import { Box, Divider } from "@mui/material";
import AppTitleInbox from "../molecules/AppTitleInbox";
import AppTextfieldInbox from "../molecules/AppTextfieldInbox";
import AppBubbleInbox from "../molecules/AppBubbleInbox";
import { useEffect, useState, useMemo } from "react";
import { convertFormatDateKey , assignUserColorsWithCookie} from "@/utils/helper";
import { getMessages } from "@/api/repository/messagesRepository";
import { toast } from "react-toastify";
import { getUser } from "@/api/repository/usersRepository";
import { getGroupMessage } from "@/api/repository/groupMessagesRepository";
import AppLoading from "../atoms/AppLoading";


const chatMessages = [
    {
      id: 1,
      username: "Mary Hilda",
      role: "other",
      dateTime: "2021-06-02T19:32:00",
      message:
        "Hello Obaidullah, I will be your case advisor for case #029290. I have assigned some homework for you to fill. Please keep up with the due dates. Should you have any questions, you can message me anytime. Thanks.",
    },
    {
      id: 2,
      username: "You",
      role: "me",
      dateTime: "2021-06-02T19:32:00",
      message:
        "Please contact Mary for questions regarding the case bcs she will be managing your forms from now on! Thanks Mary.",
    },
    {
      id: 3,
      username: "Mary Hilda",
      role: "other",
      dateTime: "2021-06-02T19:32:00",
      message: "Sure thing, Claren",
    },
    {
      id: 4,
      username: "Obaidullah Amarkhil",
      role: "other",
      dateTime: "2021-06-02T19:32:00",
      message: "Morning. I’ll try to do them. Thanks",
    },
  ];
  


const AppRoomInbox = (props) => {

    
    const [messageList, setMessageList] = useState([]);
    const [loading, setLoading] = useState(false)
    const [userColor, setUserColor] = useState([])
    const [senderUser, setSenderUser] = useState([])
    const [groups, setGroups] = useState([])
    const [typingValue , setTypingValue] = useState('')

    const groupingInboxByDate = (data) => {
        const grouped = {};
        data.length != 0 && data.forEach((msg) => {
            const dateKey = convertFormatDateKey(msg.createDate);
            if (!grouped[dateKey]) grouped[dateKey] = [];
            grouped[dateKey].push(msg);
        });
        return grouped;
    }

    const getUserById = async (id) => {
        try {
            const res = await getUser(id)
                if(res.status == 200){
                return res.data
            }else{
                toast.error('User Not Found')
            }
        } catch (error) {
            toast.error('Server Error')
        }
    } 

    const getGroupById = async (id) => {
        try {
            const res = await getGroupMessage(id)
                if(res.status == 200){
                return res.data
            }else{
            toast.error('Group Messages Not Found')
            }
        } catch (error) {
            toast.error('Server Error')
        }
    }  
    
    const getMessageData = async () => {
        try {
            setLoading(true)
            const res = await getMessages()
        
                if (res.status === 200) {
                    const allMessages = res.data;
                    
                    const filteredMessages = props.data.groupId != null ? 
                    allMessages.filter(msg => {
                        return msg.groupId == props.data.groupId
                    })
                    : allMessages.filter(msg => 
                        {
                            return (msg.senderId == props.data.senderId && msg.receiverId == props.data.receiverId) 
                            ||(msg.senderId == props.data.receiverId && msg.receiverId == props.data.senderId)
                        }
                    )

                    const finalMessages = await Promise.all(
                        filteredMessages.map(async (data) => {
                        const user = await getUserById(data.senderId);
                        return {
                                ...data,
                                username: user?.username ?? 'Unknown',
                            };
                        })
                    );
                    
                    if(props.data.groupId != null){
                        const groupsData = await getGroupById(props.data.groupId)
                        console.log(groupsData )
                        setGroups(groupsData)
                    }

                    const senderUserData = finalMessages.filter(data => { return props.data.senderId == data.senderId })
                    setSenderUser(senderUserData)

                    const userColorMap = assignUserColorsWithCookie(finalMessages, []);
                    setUserColor(userColorMap)

                    const messagesByDate = groupingInboxByDate(finalMessages)
                    setMessageList(messagesByDate)

                    setLoading(false)
                } else {
                    toast.error('Error fetching data');
                    setLoading(false)
                }
            } catch (err) {
                toast.error('Server error');
                console.error(err);
            }
        };

    useEffect(()=>{
        getMessageData()
    },[])


    return(
        <Box className={
            loading ? 'flex flex-col justify-center items-center w-full h-[70vh]  rounded-[3px]' : 
            'bg-white flex flex-col justify-start items-normal gap-[22px] w-full h-[70vh]  rounded-[3px]'
            }>
            {
                loading ?
                <AppLoading
                    text='Loading Message...'
                /> 
                :
                <>
                    <Box padding={'22px 32px 0px 32px'}>
                        <AppTitleInbox
                            title={ groups.length != 0 ? groups.name : senderUser.length != 0  ? senderUser[0].username : ''}
                            isGroup={ groups.length != 0 ? true: senderUser.length != 0  ? senderUser[0].groupsid == null ? false : true : false}
                            countUser={groups.length != 0 ? groups.members.length : senderUser.length != 0  ? senderUser[0].groupsid == null ? '' : '3' : ''}
                            onBack={props.onClose}
                            onClose={props.onClose}
                        />
                    </Box>
                    <Divider sx={{ borderColor:'primary.grey'  }} />
                    <Box className='flex-1 flex flex-col gap-[22px] items-normal justify-end scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-w-[4px] scrollbar-thumb-slate-200 scrollbar-track-transparent overflow-y-scroll' sx={{ padding: '0px 32px 0px 32px' }}>
                        {
                            messageList.length != 0 && Object.entries(messageList).map(([date, messages]) => {
                                return(
                                    <div key={date}>
                                        <Divider   orientation="horizontal" sx={{
                                            '&::before, &::after': {
                                                borderBottomWidth: '1px', 
                                                borderColor: 'primary.grey',
                                            },
                                        }} >{date}</Divider>
                                        {
                                            messages.map((data,index)=>{
                                            
                                                const color = userColor[data.username];

                                                return(
                                                        <AppBubbleInbox
                                                            key={index}
                                                            align={data.senderId == props.data.receiverId ? "flex-end" : 'flex-start'}
                                                            direction={data.senderId == props.data.receiverId  ? "flex-row-reverse" : 'flex-row'}
                                                            usernameColor={color.text}
                                                            color={color.bg}
                                                            username={data.username}
                                                            message={data.text}
                                                            alignPopover={data.senderId == props.data.receiverId  ? "right" : 'left'}
                                                            date={''}
                                                            onEdit={()=>{}}
                                                            onDelete={()=>{}}
                                                        />
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                        
                    </Box>
                    <AppTextfieldInbox
                        value={typingValue}
                        placeholder={'Type a message'}
                        onChange={((value)=>{
                            setTypingValue(value)
                        })}
                        onClick={()=>{}}
                    />
                </>
            }
            
        </Box>
    )
}

export default AppRoomInbox;