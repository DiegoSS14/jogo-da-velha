import TypeResponse from "./enums/TypeResponse";
import type EndpointDTO from "./interfaces/EndpointDTO";

export default class Request {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public async endpoint(dto: EndpointDTO) {
        const response = await fetch(`${this.baseUrl}/${dto.route}`, {
            method: dto.method || "GET", headers: 
            { "content-Type": "application/json" },
            body: JSON.stringify(dto.body)
        })

        if (!response.ok)
            throw new Error(`error: ${dto.errorMessage}. / status: ${response.status}`)

        if (dto.typeResponse === TypeResponse.TEXT) {
            return response.text()
        }

        return response.json();
    }
}