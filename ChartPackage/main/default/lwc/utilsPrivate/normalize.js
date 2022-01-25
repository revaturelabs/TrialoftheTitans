export function normalizeBoolean(value) {
    return typeof value === 'string' || !!value;
}
