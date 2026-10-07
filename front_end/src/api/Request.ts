import TypeMethod from "./enums/TypeMethod";
import TypeResponse from "./enums/TypeResponse";
import type EndpointDTO from "./interfaces/EndpointDTO";

export default class Request {
    private baseUrl: string;
    private accessToken: string | undefined;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public setAccessToken(accessToken?: string) {
        this.accessToken = accessToken;
    }

    private async endpoint(dto: EndpointDTO) {
        let response;

        const headers: HeadersInit = {
            "Content-Type": "application/json"
        };

        // SE EXISTIR TOKEN, ENVIA COMO BEARER
        if (this.accessToken) {
            headers["Authorization"] = `Bearer ${this.accessToken}`;
        }

        if (dto.body != null && dto.body != undefined) {
            response = await fetch(`${this.baseUrl}/${dto.route}`, {
                method: dto.method || "GET", headers:
                    headers,
                body: JSON.stringify(dto.body)
            })
        } else {
            response = await fetch(`${this.baseUrl}/${dto.route}`, {
                method: dto.method || "GET", headers:
                    headers
            })
        }

        if (!response.ok)
            throw new Error(`error: ${dto.errorMessage}. / status: ${response.status}`)

        if (dto.typeResponse === TypeResponse.TEXT) {
            return response.text()
        }

        return response.json();
    }

    public get(dto: EndpointDTO) {
        return this.endpoint(dto)
    }

    public post(dto: EndpointDTO) {
        dto.method = TypeMethod.POST;
        return this.endpoint(dto)
    }

    public put(dto: EndpointDTO) {
        dto.method = TypeMethod.PUT;
        return this.endpoint(dto)
    }

    public patch(dto: EndpointDTO) {
        dto.method = TypeMethod.PATCH;
        return this.endpoint(dto)
    }

    public delete(dto: EndpointDTO) {
        dto.method = TypeMethod.DELETE;
        return this.endpoint(dto)
    }

    public options(dto: EndpointDTO) {
        dto.method = TypeMethod.OPTIONS;
        return this.endpoint(dto)
    }
}