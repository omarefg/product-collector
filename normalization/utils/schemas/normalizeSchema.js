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

export const normalizeSchema = {
    id: 'string',
    keyWord: 'string',
    country: 'string',
    results: [itemSchema]
}
