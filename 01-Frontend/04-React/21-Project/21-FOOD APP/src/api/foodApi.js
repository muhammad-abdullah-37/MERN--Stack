export async function fetchFoodProductById(id) {
    const response = await fetch(`//localhost:3000/products/${id}`)
    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return response.json()
}