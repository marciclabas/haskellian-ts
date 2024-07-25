import { enumerate } from './basics.ts'

export async function head<A>(xs: AsyncIterable<A>): Promise<A|undefined> {
  for await (const x of xs)
    return x
  return undefined
}

export async function* skip<A>(n: number, xs: AsyncIterable<A>): AsyncIterable<A> {
  for await (const [i, x] of enumerate(xs))
    if (i >= n)
      yield x
}

export async function* take<A>(n: number, xs: AsyncIterable<A>): AsyncIterable<A> {
  for await (const [i, x] of enumerate(xs)) {
    if (i >= n)
      break
    yield x
  }
}

export async function* tail<A>(xs: AsyncIterable<A>): AsyncIterable<A> {
  yield* skip(1, xs)
}

/** Pad `xs` to length `n` (by appending `x` as needed) */
export async function* pad<A>(n: number, x: A, xs: AsyncIterable<A>): AsyncIterable<A> {
  let i = 0
  for await (const y of xs) {
    yield y
    i++
  }
  for (; i < n; i++)
    yield x
}

export async function uncons<A>(xs: AsyncIterable<A>): Promise<[A|undefined, AsyncIterable<A>]> {
  const iter = xs[Symbol.asyncIterator]()
  const { done, value } = await iter.next()
  return [done ? undefined : value, {
    [Symbol.asyncIterator]: () => iter
  }]
}