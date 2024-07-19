import './App.css'
import { useRef, useEffect, useState } from 'react'
import { Lista } from './Components/lista'
import { v4 } from 'uuid';

function App() {

  const [cor, setCor] = useState('#9191919e')
  const [tarefas, setTarefas] = useState([])
  
  let inputRef = useRef(null)

  useEffect(() => {
    // Carregar tarefas salvas no localStorage ao iniciar o aplicativo
    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas'))
    if (tarefasSalvas && tarefasSalvas.length > 0) {
      setTarefas(tarefasSalvas)
    }
  }, [])

  useEffect(() => {
    // Salvar tarefas no localStorage sempre que tarefas forem modificadas
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
  }, [tarefas])

  function handleClick() {
    let valor = inputRef.current.value.trim()

    if (tarefas.includes(valor)) {
      alert('Tarefa já existente')
      inputRef.current.value = ''
      return
    }

    if (valor === '') {
      return
    }


    setTarefas([{ nome: valor, id: v4() }, ...tarefas])
    console.log(tarefas);
    inputRef.current.value = ''
  }

  function taskDelete(tarefaToDelete) {
      console.log(tarefaToDelete);


    setTarefas(tarefas.filter(tarefa => tarefa.nome !== tarefaToDelete))
  }

  function corInput (corInp) {
    setCor(corInp.target.value)
    console.log(corInp);
  }

  function tarefaCompleta(taskId) {
    const tarefasAtualizadas = tarefas.map(tarefa => {
      if (tarefa.id === taskId) {
        return { ...tarefa, isComplete: !tarefa.isComplete }; // Inverte o valor de isComplete
      }

      
      return tarefa; 
    });
    
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
    console.log(tarefasAtualizadas);

    setTarefas(tarefasAtualizadas);
  }

  return (
    <>
      <div className='container' style={{backgroundColor: cor}}>

        <div className='nome-color'>
          <h1>Tarefas para fazer:</h1>
          <input value={cor} onChange={(value) => corInput(value)} className='input-color' type="color" />
        </div>
        
        <div className='input-button'>
          <div className='input-search'>
            <input ref={inputRef} placeholder='Digite uma tarefa' className='inputTask' type="text" />
          </div>
          <button onClick={handleClick} className='btn-task'>Nova Tarefa</button>
        </div>

        <div className='tarefas-div'>
          <ul className='tasklist'>
            {tarefas.map((tarefa) => (
              <Lista key={tarefa.id} id={tarefa.id} tarefa={tarefa.nome} tarefaCompleta={tarefaCompleta} index={tarefa.id} completa={tarefa.isComplete} taskDelete={taskDelete} />
            ))}
          </ul>
        </div>

      </div>
    </>
  )
}

export default App
