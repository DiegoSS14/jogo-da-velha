import TypeMethod from "./enums/TypeMethod";
import TypeResponse from "./enums/TypeResponse";
import type HasWinDTO from "./interfaces/HasWinDTO";
import type PlayDTO from "./interfaces/PlayDTO";
import type PlayersDTO from "./interfaces/PlayersDTO";
import Request from "./Request";

const request: Request = new Request("http://localhost:8080");

export async function showBoard() {
    return request.endpoint({ route: 'board' })
}

export async function hasMark(dto: PlayDTO) {
    const hasWin: HasWinDTO = request.endpoint({ route: 'players/play', method: TypeMethod.POST, errorMessage: 'Erro ao marcar posição', body: dto }) as any
    return hasWin
}

export async function definePlayers(dto: PlayersDTO) {
    return request.endpoint({ route: 'players/define', method: TypeMethod.POST, errorMessage: 'Erro ao definir players', typeResponse: TypeResponse.TEXT, body: dto})
}

export async function reset() {
    return request.endpoint({ route: 'reset', typeResponse: TypeResponse.TEXT })
}

