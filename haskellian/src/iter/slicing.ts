export function* enumerate<A>(xs: Iterable<A>): Iterable<[number, A]> {
  let i = 0
  for (const x of xs)
    yield [i++, x]

}

export function head<A>(xs: Iterable<A>): A | undefined {
  for (const x of xs)
    return x
  return undefined
}

export function* skip<A>(n: number, xs: Iterable<A>): Iterable<A> {
  for (const [i, x] of enumerate(xs))
    if (i >= n)
      yield x
}

export function* take<A>(n: number, xs: Iterable<A>): Iterable<A> {
  for (const [i, x] of enumerate(xs)) {
    if (i >= n)
      break
    yield x
  }
}

export function* tail<A>(xs: Iterable<A>): Iterable<A> {
  yield* skip(1, xs)
}

/** Pad `xs` to length `n` (by appending `x` as needed) */
export function* pad<A>(n: number, x: A, xs: Iterable<A>): Iterable<A> {
  let i = 0
  for (const y of xs) {
    yield y
    i++
  }
  for (; i < n; i++)
    yield x
}

export function uncons<A>(xs: Iterable<A>): [A|undefined, Iterable<A>] {
  const iter = xs[Symbol.iterator]()
  const { done, value } = iter.next()
  return [done ? undefined : value, {
    [Symbol.iterator]: () => iter
  }]
}