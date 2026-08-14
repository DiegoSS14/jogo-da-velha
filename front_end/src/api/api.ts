import TypeResponse from "./enums/TypeResponse";
import type HasWinDTO from "./interfaces/HasWinDTO";
import type PlayDTO from "./interfaces/PlayDTO";
import type PlayersDTO from "./interfaces/PlayersDTO";
import Request from "./Request";

const request: Request = new Request("http://localhost:8080");

export async function showBoard() {
    return request.get({ route: 'board' })
}

export async function hasMark(dto: PlayDTO) {
    const hasWin: HasWinDTO = request.post({ route: 'players/play', errorMessage: 'Erro ao marcar posição', body: dto }) as any
    return hasWin
}

export async function definePlayers(dto: PlayersDTO) {
    return request.post({ route: 'players/define', errorMessage: 'Erro ao definir players', typeResponse: TypeResponse.TEXT, body: dto})
}

export async function reset() {
    return request.get({ route: 'reset', typeResponse: TypeResponse.TEXT })
}

