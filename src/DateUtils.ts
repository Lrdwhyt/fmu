export function offsetDate(date: Date, days: number, hours: number): Date {
    return new Date(date.getTime() + (days * 24 + hours) * 60 * 60 * 1000);
}