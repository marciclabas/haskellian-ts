export function* enumerate<A>(xs: Iterable<A>): Iterable<[number, A]> {
  let i = 0
  for (const x of xs)
    yield [i++, x]
}

export function* map<A, B>(f: (x: A, idx: number) => B, xs: Iterable<A>): Iterable<B> { 
  for (const [i, x] of enumerate(xs))
    yield f(x, i)
}

export function* filter<A>(p: (x: A, idx: number) => boolean, xs: Iterable<A>): Iterable<A> {
  for (const [i, x] of enumerate(xs))
    if (p(x, i))
      yield x
}

export function* flatten<A>(xss: Iterable<Iterable<A>>): Iterable<A> {
  yield* flatmap(x => x, xss)
}

export function* flatmap<A, B>(f: (x: A) => Iterable<B>, xs: Iterable<A>): Iterable<B> {
  for (const x of xs)
    for (const y of f(x))
      yield y
}

export function range(end: number): Iterable<number>
export function range(start: number, end: number, step?: number): Iterable<number>
export function* range(start: number, end?: number, step: number = 1): Iterable<number> {
  if (end === undefined) {
    end = start
    start = 0
  }
  for (let i = start; i < end; i += step)
    yield i
}