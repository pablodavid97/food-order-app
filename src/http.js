export async function fetchMeals() {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/meals`);

    if (!response.ok) {
        throw new Error('Failed to fetch meals');
    }

    const data = await response.json();

    return data;
}

export async function submitOrder(order) {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            order,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to submit order');
    }
    const data = await response.json();

    return data;
}
