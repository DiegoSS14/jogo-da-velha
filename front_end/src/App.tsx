import { useEffect, useState, type SubmitEvent } from 'react';
import './App.css';

import { definePlayers, hasMark, reset, showBoard } from './api/api';
import type PlayDTO from './api/interfaces/PlayDTO';
import type PlayersDTO from './api/interfaces/PlayersDTO';
import type HasWinDTO from './api/interfaces/HasWinDTO';

function App() {
  const [board, setBoard] = useState<string[]>();
  const [nameP1, setnameP1] = useState<string>("");
  const [nameP2, setnameP2] = useState<string>("");

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [win, setWin] = useState<HasWinDTO>({ win: false, tie: false, winner: "" });

  useEffect(() => {
    loadBoard()
  }, [])

  useEffect(() => {
    loadBoard()
  }, [board])

  async function loadBoard() {
    try {
      const board = await showBoard();
      setBoard(board)
    } catch (err) {
      console.error(err)
    }
  }

  async function markPosition(position: number) {
    const play: PlayDTO = {position: position+""}
      setWin((await hasMark(play)))
  }

  async function setPlayers() {
    const players: PlayersDTO = { nameP1, nameP2 }
    if (nameP1 != "" && nameP2 != "") {
      definePlayers(players)
      setIsPlaying(true)
    }
  }

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    setPlayers()
  }

  function resetSection() {
    reset()
    setIsPlaying(false)
    setWin({ win: false, tie: false, winner: "" })
    clearPlayers()
  }

  function revanche() {
    setWin({ win: false, tie: false, winner: "" })
    reset()
  }

  function clearPlayers() {
    setnameP1("")
    setnameP2("")
  }

  return (
    <div className='relative flex flex-col items-center justify-center min-h-screen p-6 bg-bg mx-auto'>
      {(win.tie == false && win.win == true) && (
        <section className='flex flex-col items-center justify-center gap-4 rounded-lg absolute'>
          <h1 className='text-4xl font-bold text-white'>{`${win.winner} você ganhou!`}</h1>
          <div className='w-full flex justify-center gap-2'>
            <button
              onClick={() => revanche()}
              className='w-full bg-green-500 px-3 py-2 rounded-lg text-zinc-900 font-medium cursor-pointer'
            >Revanche</button>
            <button
              onClick={() => resetSection()}
              className='w-full bg-zinc-400 px-3 py-2 rounded-lg text-zinc-900 font-medium cursor-pointer'
            >Reiniciar partida</button>
          </div>
        </section>
      )}
      {(win.tie == true && win.win == false) && (
        <section className='flex flex-col items-center justify-center gap-4 rounded-lg absolute'>
          <h1 className='text-4xl font-bold text-white'>Empate!</h1>
          <div className='w-full flex justify-center gap-2'>
            <button
              onClick={() => revanche()}
              className='w-full bg-green-500 px-3 py-2 rounded-lg text-zinc-900 font-medium cursor-pointer'
            >Revanche</button>
            <button
              onClick={() => resetSection()}
              className='w-full bg-zinc-400 px-3 py-2 rounded-lg text-zinc-900 font-medium cursor-pointer'
            >Reiniciar partida</button>
          </div>
        </section>
      )}
      {!(win.tie == true && win.win == true) && (
        <section className='flex flex-col gap-10 justify-center items-center w-full max-w-100'>
          <h1 className='text-4xl font-bold text-text-h'>Jogo da velha</h1>

          {!isPlaying && (
            <form
              onSubmit={handleSubmit}
              className='flex flex-col gap-2 justify-center items-center w-full'>

              <div className='w-full flex flex-col gap-1'>
                <input
                  className='bg-zinc-800/40 px-3 py-2 rounded-lg text-white'
                  onChange={e => setnameP1(e.target.value)}
                  type="text" id="p1" name='namep1' placeholder='Jogador 1' />
                <input
                  className='bg-zinc-800/40 px-3 py-2 rounded-lg text-white'
                  onChange={e => setnameP2(e.target.value)}
                  type="text" id="p2" name='namep2' placeholder='Jogador 2' />
              </div>

              <button
                className='w-full bg-accent px-3 py-2 rounded-lg text-zinc-900 font-medium cursor-pointer'
                type='submit'>Definir jogadores</button>
            </form>
          )}
          {isPlaying && (
            <div className='grid grid-cols-3 gap-1 p-1 w-100 h-100 rounded-lg items-center justify-center'>
              {board?.map((cel, index) => (
                <div
                  onClick={() => markPosition(index + 1)}
                  className='w-full h-full p-4 flex items-center justify-center bg-zinc-800/40 rounded-md hover:bg-accent/10 transition-all cursor-pointer'
                  id={cel + index} key={index}>
                  <span className='text-5xl font-medium text-white/30'>{cel}</span>
                </div>
              ))}
            </div>
          )}
          {isPlaying && (
            <button
              onClick={() => resetSection()}
              className='w-full bg-zinc-400 px-3 py-2 rounded-lg text-zinc-900 font-medium cursor-pointer'
            >Reiniciar partida</button>
          )}
        </section>
      )}
    </div>
  )
}

export default App
