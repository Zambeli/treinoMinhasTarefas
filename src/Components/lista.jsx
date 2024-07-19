/* eslint-disable react/prop-types */

import { CircleCheck, X } from 'lucide-react'

export const Lista = (props) => {

  const blue = '#a4ff79'
  const red = '#ffffff90'

  return (

    props.completa ? ( <li key={props.index} style={{ backgroundColor: blue }}  className='task'>
      <span>{props.tarefa}</span>
      <div className='taskbuttons'>
        <button onClick={() => props.tarefaCompleta(props.id)} className='buttons-task right'><CircleCheck color='#000' /></button>
        <button onClick={() => props.taskDelete(props.tarefa)}  className='buttons-task del'><X color='#000' /></button>
      </div>
    </li>) : (
     <li key={props.index} style={{ backgroundColor: red}}  className='task'>
     <span>{props.tarefa}</span>
     <div className='taskbuttons'>
       <button onClick={() => props.tarefaCompleta(props.id)} className='buttons-task right'><CircleCheck color='#000' /></button>
       <button onClick={() => props.taskDelete(props.tarefa)}  className='buttons-task del'><X color='#000' /></button>
     </div>
   </li>
    )



   
  )
}