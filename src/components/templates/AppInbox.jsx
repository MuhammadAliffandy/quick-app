'use client'
import { Box, Divider } from "@mui/material";
import AppMessage from "../organisms/AppMessage";
import AppTextField from "../atoms/AppTextField";
import AppRoomInbox from "../organisms/AppRoomInbox";
import { useEffect, useState } from "react";
import { getUser } from "@/api/repository/usersRepository";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { getMessages } from "@/api/repository/messagesRepository";
import AppLoading from "../atoms/AppLoading";
import { getGroupMessage } from "@/api/repository/groupMessagesRepository";

const currentUserId = 'u1';
const AppInbox = () => {


    const [openRoom, setOpenRoom] = useState(false);
    const [loading, setLoading] = useState(false);
    const [messagesOpened, setMessageOpened] = useState([]);
    const [messageCurrent, setMessageCurrent] = useState([]);
    const [messageList, setMessageList] = useState([]);
    const [searchValue, setSearchValue] = useState('Search');

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

              const personalMessages = allMessages.filter(
                (msg) => msg.receiverId === currentUserId && !msg.groupId
              );
        
              const groupMessages = allMessages.filter(
                (msg) => msg.groupId && msg.receiverId === null
              );
        
              const latestGroupMessages = Object.values(
                groupMessages.reduce((acc, msg) => {
                  const groupId = msg.groupId;
                  if (
                    !acc[groupId] ||
                    dayjs(msg.createdDate).isAfter(dayjs(acc[groupId].createdDate))
                  ) {
                    acc[groupId] = msg;
                  }
                  return acc;
                }, {})
              );
        
              const containMessages = [...personalMessages, ...latestGroupMessages].sort(
                (a, b) => dayjs(b.createdDate).valueOf() - dayjs(a.createdDate).valueOf()
              );
              
              const finalMessages = await Promise.all(
                containMessages.map(async (data) => {
                  const user = await getUserById(data.senderId);
                  const group =  data.groupId != null && await getGroupById(data.groupId);
                  return {
                    ...data,
                    username: user?.username ?? 'Unknown',
                    groupName: group?.name ?? 'Non Group Name'
                  };
                })
              );
              setMessageCurrent(finalMessages)
              setMessageList(finalMessages)
              setLoading(false)
            } else {
              toast.error('User not found');
              setLoading(false)
            }
          } catch (err) {
            toast.error('Server error');
            console.error(err);
          }
        };

    const handleSearchInbox = (value) => {
        setSearchValue(value)
        const values = value.toLowerCase()
        try {
          setLoading(true)
          if(values == '' || values == 'search'){
            
            setMessageList(messageCurrent)
          }else{
            const searchMessage = messageList.filter((data) => {
              return(data.username.toLowerCase().includes(values.toLowerCase()) ||
                data.text.toLowerCase().includes(values.toLowerCase()))
            })
            setMessageList(searchMessage)
          }
          
          setLoading(false)
        } catch (error) {
          toast.error('Server error')
          setLoading(false)
        }
    }
    
    useEffect(()=>{
      getMessageData()
    },[])

    return(

        <>
        {
            openRoom ?
            <AppRoomInbox
              data={messagesOpened}
              onClose={()=>{
                setOpenRoom(false)
              }}
            /> : 
            <Box className= 'bg-white px-[32px] py-[24px] flex flex-col justify-start items-center gap-[22px] w-full h-[70vh] rounded-[3px]'>

                <Box className='border-[1px] border-black rounded-[5px] w-full'>
                    <AppTextField
                        id='searchBar'
                        endAdornment = {'/icon/search-black.svg'}
                        value={searchValue}
                        placeholder = {'Search'}
                        padding={'5px 5px 5px 86px'}
                        paddingLeft= {'86px'}
                        paddingRight= {'86px'}
                        onChange={handleSearchInbox}/>
                </Box>
                <Box className={ loading ? 'flex flex-col justify-center items-center h-full w-full' :
                'flex flex-col gap-[22px] items-center justify-start w-full scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-w-[4px] scrollbar-thumb-slate-200 scrollbar-track-transparent overflow-y-scroll '}>
                {
                  loading ? 
                  <AppLoading
                    text='Loading Message...'
                  /> : 
                    messageList.map((data, index)=>{

                        const dataOpened = {
                          senderName : data.username,
                          senderId: data.senderId,
                          receiverId: currentUserId,
                          groupId : data.groupId,
                        }

                        return(
                    
                            <Box key={index} className='flex flex-col gap-[22px] w-full'>
                            {
                              data.groupId != null ? 
                              <AppMessage
                                    isGroup={true}
                                    title={data.groupName}
                                    date={data.createDate}
                                    username={data.username}
                                    message={data.text}
                                    onClick={()=>{
                                      setOpenRoom(true)
                                      setMessageOpened(dataOpened)
                                }}
                              />
                              :
                              <AppMessage
                                    isGroup={false}
                                    title={data.username}
                                    date={data.createDate}
                                    message={data.text}
                                    onClick={()=>{
                                      setMessageOpened(dataOpened)
                                      setOpenRoom(true)
                                }}
                              />
                            }
                            { index+1 != messageList.length && <Divider sx={{ borderColor:'primary.grey'  }} /> }
                        </Box>
                        )
                    })
                }
                </Box>
            </Box>
        }
        </>
        
    )
}

export default AppInbox;