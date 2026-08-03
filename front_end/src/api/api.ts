import type HasWinDTO from "./interfaces/HasWinDTO";
import type PlayDTO from "./interfaces/PlayDTO";
import type PlayersDTO from "./interfaces/PlayersDTO";

export async function showBoard() {
    const response = await fetch('http://localhost:8080/board', {
        method: "GET", headers: {"content-Type": "application/json"}
    })

    if(!response.ok) 
        throw new Error(`Erro ao buscar board ${response.status}`)

    return response.json();
}

export async function hasMark(dto: PlayDTO) {
    const response = await fetch("http://localhost:8080/players/play", {
        method: "POST", headers: {"content-Type": "application/json"},
        body: JSON.stringify(dto)
    })

    if(!response.ok)
        throw new Error(`Erro ao marcar posição: ${response.status}`)

    const hasWin: HasWinDTO = await response.json() as HasWinDTO

    console.log(hasWin)
    return hasWin
}

export async function definePlayers(dto: PlayersDTO) {
    const response = await fetch("http://localhost:8080/players/define", {
        method: "POST", headers: {"content-Type": "application/json"},
        body: JSON.stringify(dto)
    })

    if(!response.ok) 
        throw new Error(`Erro ao definir players: ${response.status}`)

    return response.text()
}

export async function reset() {
    const response = await fetch("http://localhost:8080/reset", {
        method: "GET", headers: {"content-Type": "application/json"},
    })

    if(!response.ok)
        throw new Error(`Erro ao resetar jogo: ${response.status}`)

    return response.text()
}

