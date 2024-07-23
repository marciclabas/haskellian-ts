export const clamp = (min: number, x: number, max: number) => Math.max(min, Math.min(x, max))
/** Always positive `n % m` */
export const mod = (n: number, m: number) => ((n % m) + m) % m