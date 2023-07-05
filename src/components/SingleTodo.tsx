import React, { useState } from 'react'
import { Todo } from '../model'
import {AiFillDelete,AiFillEdit} from 'react-icons/ai'
import {MdDone} from 'react-icons/md'
import './styles.css'

interface Props{
    todo:Todo,
    todos:Todo[],
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo:React.FC<Props> = ({todo,todos,setTodos}) => {

    const [isEditing,setisEditing] = useState(false);
    const [edit,setEdit] = useState(todo.todo)

    const handleDone = (id:number)=>{
        setTodos(
            todos.map((todo)=> todo.id === id? {...todo,isDone:!todo.isDone}:todo)
        )
    }

    const handleDelete = (id:number)=>{
        setTodos(todos.filter((todo)=> todo.id !== id))
    }

    const handleEdit = (e:React.FormEvent, id:number) =>{
        e.preventDefault();
        setEdit(edit);
        setTodos(todos.map((todo)=>
            todo.id === id ?{...todo,todo:edit}:todo
        ))
    }

  return (

    <form className='todos__single' onSubmit={(e)=>handleEdit(e,todo.id)}>
        {
            isEditing?(
                <input type="text" value={edit} onChange={(e)=> setEdit(e.target.value)} />
            ): todo.isDone?
            (
                <s className='todos__single--text'>{todo.todo}</s>
            ):(
                <span className='todos__single--text'>{todo.todo}</span>
            )
        }
        
        

        <div>
            <span className='icon' onClick={()=>{
                if(!isEditing && !todo.isDone){
                setisEditing(true)
                }
            } }>
                <AiFillEdit />
            </span>
            <span className='icon' onClick={()=>handleDelete(todo.id)}>
                <AiFillDelete />
            </span>
            <span className='icon' onClick={()=>handleDone(todo.id)}>
                <MdDone />
            </span>
        </div>
    </form>
  )
}

export default SingleTodo