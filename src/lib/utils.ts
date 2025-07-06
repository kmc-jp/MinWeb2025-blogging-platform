export function safeStringify(value: any): string {
    if (value === null || value === undefined) {
        return '';
    }
    if (typeof value === 'string') {
        return value;
    }
    if (typeof value === 'object') {
        const res = value.inner ? value.inner : value.$oid
        return res;
    }
    return String(value);
}
