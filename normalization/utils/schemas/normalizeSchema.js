export const itemSchema = {
    title: 'string',
    countryState: 'string',
    currency: 'string',
    condition: 'string',
    model: 'string',
    price: 'number',
    soldQuantity: 'number',
    data: 'string'
}

export const normalizeChema = {
    id: 'string',
    keyWord: 'string',
    country: 'string',
    results: [itemSchema]
}
