import type TypeResponse from "../enums/TypeResponse"
import type TypeMethod from "../enums/TypeMethod"

export default interface EndpointDTO {
    route: string 
    method?: TypeMethod, 
    typeResponse?: TypeResponse, 
    body?: any, 
    errorMessage?: string
}