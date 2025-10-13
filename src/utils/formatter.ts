export const formatCurrency = (number: number | string) => {
    return Number.parseFloat(number.toString()).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}

export const formatDateTime = (date: string) => {
    return new Date(date).toDateString();
}