export const formatCurrency = (number: number | string) => {
    return Number.parseFloat(number.toString()).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}