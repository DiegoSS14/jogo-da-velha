const TypeMethod = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    PATCH: "PATCH",
    DELETE: "DELETE",
    OPTION: "OPTION",
} as const;

type TypeMethod = typeof TypeMethod[keyof typeof TypeMethod];

export default TypeMethod;