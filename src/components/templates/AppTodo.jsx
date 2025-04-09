import { Box , Divider} from "@mui/material";
import AppTask from "../organisms/AppTask";
import { useEffect, useState } from "react";
import { convertDatePeriodText, sortedByClosestDate } from "@/utils/helper";
import AppSelectButton from "../atoms/AppSelectButton";
import AppButton from "../atoms/AppButton";
import { createTodo, deleteTodo, getTodos, updateTodo } from "@/api/repository/todoRepository";
import AppLoading from "../atoms/AppLoading";
import { toast } from "react-toastify";

const AppTodo = () => {

    const [newTitle, setNewtTitle] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newDate, setNewDate] = useState({})
    const [newCategory, setNewCategory] = useState([])
    // 
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState({})
    const [category, setCategory] = useState([])
    // 
    const [ isNewTask , setNewTask ] = useState(false)
    const [ loading , setLoading ] = useState(false)
    const [ tasks , setTasks ] = useState([])
    const [ currentTasks , setCurrentTasks ] = useState([])

    const handleSortTask = (value) => {
        setLoading(true)
        if(value == 0){
            const data = sortedByClosestDate(tasks)
            setTasks(data)
        }else{
            setTasks(currentTasks)
        }
        setLoading(false)
    }

    const handleCreateTask = async () => {
        try {
            setLoading(true)
            
            const data = {
                title: newTitle,
                description: newDescription,
                date: newDate.toISOString(),
                category: category,
            }
            
            const res = await createTodo(data)
            if(res.status == 201){
                toast.success('Create Todo Success')
                setNewTask(false)
            }else{
                toast.success('Create Todo Failed')
            }
            setLoading(false)

        } catch (error) {
            toast.error('Server Error')
        }
    }

    const handleUpdateTask = async (data) => {
        try {
            const data = {
                title: title,
                description: description,
                date: date.toISOString(),
                category: category,
            }
            
            const res = await updateTodo(data)

            if(res.status == 201){
                
            }else{
                toast.success('Create Todo Failed')
            }
            
        } catch (error) {
            toast.error('Server Error')
        }

    }

    const handleDeleteTask = async (id) => {
        setLoading(true)
        try {
            const res = await deleteTodo(id);
            
            if(res.status == 200){
                toast.success('Delete Todo Success')
                setLoading(false)
            }else{
                alert('fetching error')
                toast.error('Delete Todo Failed')
                setLoading(false)
            }
            
        } catch (error) {
            setLoading(false)
            toast.error('Server Error')
        }
    }

    const handleFetchTask = async () => {
        setLoading(true)
        try {
            const res = await getTodos();
            
            if(res.status == 200){
                setTasks(res.data)
                setCurrentTasks(res.data)
                setLoading(false)
            }else{
                alert('fetching error')
                setLoading(false)
            }
            
        } catch (error) {
            setLoading(false)
            toast.error('Server Error')
        }
    }

    useEffect(()=>{
        if(tasks.length == 0 ){
            handleFetchTask()
        }
    },[])


    return(
        <Box className='bg-white px-[32px] py-[24px] flex flex-col justify-start items-center w-full gap-[22px] h-[70vh] rounded-[3px]'>
            <Box className='flex justify-between items-center p-0 w-full'> 
                <Box className='ml-21'>
                    <AppSelectButton
                        data ={['Personal Errands', 'Urgent To-Do']}
                        onChange={handleSortTask}
                    />
                </Box>
                <AppButton
                    text={'New Task'}
                    onClick={()=> setNewTask(!isNewTask)}
                />
            </Box>
            <Box className= { 
                loading ? 'flex flex-col justify-center items-center h-full w-full'
                : 'flex flex-col gap-[22px] items-center justify-start w-full scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-w-[4px] scrollbar-thumb-slate-400 scrollbar-track-transparent overflow-y-scroll' 
                }>
                {
                    loading ? 
                    <AppLoading
                        text='Loading Task...'
                    /> : 
                    tasks.map((data,index)=>{
                        return(
                            <Box key={data.id} className='flex flex-col gap-[22px] w-full'>
                                {
                                    isNewTask && index == 0 && 
                                        <AppTask
                                            isNew={isNewTask}
                                            title={newTitle}
                                            date={newDate}
                                            description={newDescription}
                                            category={newCategory}
                                            dateTime={''}
                                            datePeriod={''}
                                            onChangeTitle={(value)=> setNewtTitle(value) }
                                            onChangeDate={(value)=> setNewDate(value)}
                                            onChangeDescription={(value)=> setNewDescription(value)}
                                            onChangeCategory={(value)=> setNewCategory(value)}
                                            onAdd={handleCreateTask}
                                            onCancel={()=>{setNewTask(false)}}
                                        />
                                }
                                <AppTask
                                    title={data.title}
                                    date={data.dateTask}
                                    description={data.description}
                                    dateTime={data.dateTask}
                                    category={data.category}
                                    datePeriod={data.dateTask}
                                    onChangeTitle={(value)=> setTitle(value) }
                                    onChangeDate={(value)=> setDate(value)}
                                    onChangeDescription={(value)=> setDescription(value)}
                                    onChangeCategory={(value)=> setCategory(value)}
                                    onDeleteTask={() => handleDeleteTask(data.id)}
                                />
                                { index+1 != tasks.length && <Divider sx={{ borderColor:'primary.grey'  }} /> }
                            </Box>
                        )
                    })
                }
            </Box>

        </Box>
    )
}

export default AppTodo;