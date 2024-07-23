import { uncons } from "./slicing.ts";

// @ts-ignore-next
export function zip<A, B>(as: Iterable<A>, bs: Iterable<B>): Iterable<[A, B]>
export function zip<A, B, C>(as: Iterable<A>, bs: Iterable<B>, cs: Iterable<C>): Iterable<[A, B, C]>
export function zip<A, B, C, D>(as: Iterable<A>, bs: Iterable<B>, cs: Iterable<C>, ds: Iterable<D>): Iterable<[A, B, C, D]>
export function zip<A, B, C, D, E>(as: Iterable<A>, bs: Iterable<B>, cs: Iterable<C>, ds: Iterable<D>, es: Iterable<E>): Iterable<[A, B, C, D, E]>
export function zip<A, B, C, D, E, F>(as: Iterable<A>, bs: Iterable<B>, cs: Iterable<C>, ds: Iterable<D>, es: Iterable<E>, fs: Iterable<F>): Iterable<[A, B, C, D, E, F]>
export function zip<A>(...xss: Iterable<A>[]): Iterable<A[]>
export function zip(...xss: Iterable<any>[]) {
  const iters = xss.map(xs => xs[Symbol.iterator]())
  return {
    [Symbol.iterator]: () => ({
      next: () => {
        const values = iters.map(iter => {
          const { done, value } = iter.next()
          return done ? undefined : value
        })
        return { done: values.some(value => value === undefined), value: values }
      }
    })
  }
}

// @ts-ignore-next
export function unzip<A, B>(xs: Iterable<[A, B]>): [Iterable<A>, Iterable<B>] 
export function unzip<A, B, C>(xs: Iterable<[A, B, C]>): [Iterable<A>, Iterable<B>, Iterable<C>]
export function unzip<A, B, C, D>(xs: Iterable<[A, B, C, D]>): [Iterable<A>, Iterable<B>, Iterable<C>, Iterable<D>]
export function unzip<A, B, C, D, E>(xs: Iterable<[A, B, C, D, E]>): [Iterable<A>, Iterable<B>, Iterable<C>, Iterable<D>, Iterable<E>]
export function unzip<A, B, C, D, E, F>(xs: Iterable<[A, B, C, D, E, F]>): [Iterable<A>, Iterable<B>, Iterable<C>, Iterable<D>, Iterable<E>, Iterable<F>]
export function unzip<A>(xs: Iterable<A[]>): Iterable<A>[]
export function unzip(xs: Iterable<any>) {
  const iters = [...xs].map(xs => xs[Symbol.iterator]())
  return iters.map(iter => ({
    [Symbol.iterator]: () => ({
      next: () => {
        const { done, value } = iter.next()
        return { done, value: done ? undefined : value }
      }
    })
  }))
}

/**
 * `pairwise([x1, x2, x3, x4, ...]) = [(x1, x2), (x2, x3), (x3, x4), ...]`
 * - `pairwise([]) = []`
 * - `pairwise([x]) = []`
 */
export function* pairwise<A>(xs: Iterable<A>): Iterable<[A, A]> {
  const [x0, tail] = uncons(xs)
  for (const x1 of tail)
    yield [x0!, x1]
}