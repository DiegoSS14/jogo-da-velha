import { useEffect, useState, type SubmitEvent } from 'react';
import './App.css';

import {
  definePlayers,
  hasMark,
  reset,
  showBoard,
  setAccessToken
} from './api/api';
import type PlayDTO from './api/interfaces/PlayDTO';
import type PlayersDTO from './api/interfaces/PlayersDTO';
import type HasWinDTO from './api/interfaces/HasWinDTO';
import { useAuth } from 'react-oidc-context';

function App() {
  const [board, setBoard] = useState<string[]>();
  const [nameP1, setnameP1] = useState<string>("");
  const [nameP2, setnameP2] = useState<string>("");

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [win, setWin] = useState<HasWinDTO>({ win: false, tie: false, winner: "" });

  const auth = useAuth();

  useEffect(() => {
    if (!auth.isAuthenticated && !auth.isLoading && !auth.error) {
      auth.signinRedirect();
    }
  }, [auth.isAuthenticated, auth.isLoading, auth.error, auth.signinRedirect]);

  useEffect(() => {
    if (auth.isAuthenticated && auth.user?.access_token) {
      setAccessToken(auth.user.access_token);
      loadBoard();
    }
  }, [auth.isAuthenticated, auth.user?.access_token]);

  async function loadBoard() {
    try {
      const boardData = await showBoard();
      setBoard(boardData);
    } catch (err) {
      console.error("Erro ao carregar o tabuleiro:", err);
    }
  }

  async function markPosition(position: number) {
    const play: PlayDTO = { position: position + "" };
    const winResult = await hasMark(play);
    setWin(winResult);
    // Atualiza o tabuleiro após a jogada
    await loadBoard();
  }

  async function setPlayers() {
    const players: PlayersDTO = { nameP1, nameP2 };
    if (nameP1 !== "" && nameP2 !== "") {
      await definePlayers(players);
      setIsPlaying(true);
      await loadBoard();
    }
  }

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    setPlayers();
  }

  async function resetSection() {
    await reset();
    setIsPlaying(false);
    setWin({ win: false, tie: false, winner: "" });
    clearPlayers();
    await loadBoard();
  }

  async function revanche() {
    setWin({ win: false, tie: false, winner: "" });
    await reset();
    await loadBoard();
  }

  function clearPlayers() {
    setnameP1("");
    setnameP2("");
  }

  if (auth.isLoading) {
    return <div className="flex items-center justify-center min-h-screen text-white">Carregando e verificando autenticação...</div>;
  }

  if (auth.error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">Ocorreu um erro no login: {auth.error.message}</div>;
  }

  if (!auth.isAuthenticated) return null;

  // 1. Caso haja um vencedor
  if (!win.tie && win.win) {
    return (
      <div className='relative flex flex-col items-center justify-center min-h-screen p-6 bg-bg mx-auto'>
        <section className='flex flex-col items-center justify-center gap-4 rounded-lg absolute'>
          <h1 className='text-4xl font-bold text-white'>{`${win.winner} você ganhou!`}</h1>
          <div className='w-full flex justify-center gap-2'>
            <button
              onClick={revanche}
              className='w-full bg-green-500 px-3 py-2 rounded-lg text-zinc-900 font-medium cursor-pointer'
            >
              Revanche
            </button>
            <button
              onClick={resetSection}
              className='w-full bg-zinc-400 px-3 py-2 rounded-lg text-zinc-900 font-medium cursor-pointer'
            >
              Reiniciar partida
            </button>
          </div>
        </section>
      </div>
    );
  }

  // 2. Caso haja um empate
  if (win.tie && !win.win) {
    return (
      <div className='relative flex flex-col items-center justify-center min-h-screen p-6 bg-bg mx-auto'>
        <section className='flex flex-col items-center justify-center gap-4 rounded-lg absolute'>
          <h1 className='text-4xl font-bold text-white'>Empate!</h1>
          <div className='w-full flex justify-center gap-2'>
            <button
              onClick={revanche}
              className='w-full bg-green-500 px-3 py-2 rounded-lg text-zinc-900 font-medium cursor-pointer'
            >
              Revanche
            </button>
            <button
              onClick={resetSection}
              className='w-full bg-zinc-400 px-3 py-2 rounded-lg text-zinc-900 font-medium cursor-pointer'
            >
              Reiniciar partida
            </button>
          </div>
        </section>
      </div>
    );
  }

  // 3. Estado padrão (Jogo em andamento ou Tela inicial)
  return (
    <div className='relative flex flex-col items-center justify-center min-h-screen p-6 bg-bg mx-auto'>
      <section className='flex flex-col gap-10 justify-center items-center w-full max-w-100'>
        <h1 className='text-4xl font-bold text-text-h'>Jogo da velha</h1>

        {!isPlaying ? (
          <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-2 justify-center items-center w-full'
          >
            <div className='w-full flex flex-col gap-1'>
              <input
                className='bg-zinc-800/40 px-3 py-2 rounded-lg text-white'
                onChange={e => setnameP1(e.target.value)}
                type="text"
                id="p1"
                name='namep1'
                placeholder='Jogador 1'
              />
              <input
                className='bg-zinc-800/40 px-3 py-2 rounded-lg text-white'
                onChange={e => setnameP2(e.target.value)}
                type="text"
                id="p2"
                name='namep2'
                placeholder='Jogador 2'
              />
            </div>

            <button
              className='w-full bg-accent px-3 py-2 rounded-lg text-zinc-900 font-medium cursor-pointer'
              type='submit'
            >
              Definir jogadores
            </button>
          </form>
        ) : (
          <>
            <div className='grid grid-cols-3 gap-1 p-1 w-100 h-100 rounded-lg items-center justify-center'>
              {board?.map((cel, index) => (
                <div
                  onClick={() => markPosition(index + 1)}
                  className='min-w-16 min-h-16 w-full h-full p-4 flex items-center justify-center bg-zinc-800/40 rounded-md hover:bg-accent/10 transition-all cursor-pointer'
                  key={index}
                >
                  <span className='text-5xl font-medium text-white/30'>{cel}</span>
                </div>
              ))}
            </div>

            <button
              onClick={resetSection}
              className='w-full bg-zinc-400 px-3 py-2 rounded-lg text-zinc-900 font-medium cursor-pointer'
            >
              Reiniciar partida
            </button>
          </>
        )}
      </section>
    </div>
  );
}

export default App
