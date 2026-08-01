import { useEffect, useState } from 'react'
import './App.css'

import showBoard from './api/api'

function App() {
  const [board, setBoard] = useState<string[]>();

  useEffect(()=>{
    async function loadBoard() {
      try{
        const board = await showBoard();
        setBoard(board)
      } catch(err) {
        console.error(err)
      }
    }

    loadBoard()
  }, [])

  useEffect(()=>{
    console.log(board)
  }, [board])

  return (
    <div className='relative flex flex-col items-center justify-center min-h-screen p-6 bg-bg mx-auto'>

      <section className='flex flex-col gap-10 justify-center items-center w-full max-w-7xl'>
        <h1 className='text-4xl font-bold text-text-h'>Jogo da velha</h1>
        <div className='grid grid-cols-3 gap-2 p-1 w-100 h-100 bg-code-bg rounded-lg flex items-center justify-center'>
          {board?.map((cel, index)=>(
            <div
              className='w-full h-full p-4 flex items-center justify-center bg-zinc-800'
              id={cel + index} key={index}>
              <span className='text-5xl font-medium text-white/30'>{cel}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App
