const TypeResponse = {
    JSON: "JSON",
    TEXT: "TEXT"
} as const;

type TypeResponse = typeof TypeResponse[keyof typeof TypeResponse];

export default TypeResponse;