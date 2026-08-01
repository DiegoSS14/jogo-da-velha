export default async function showBoard() {
    const response = await fetch('http://localhost:8080/board', {
        method: "GET", headers: {"content-Type": "application/json"}
    })

    if(!response.ok) {
        throw new Error(`Erro ao buscar board ${response.status}`)
    }

    return response.json();
}