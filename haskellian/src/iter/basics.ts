export function* map<A, B>(f: (x: A) => B, xs: Iterable<A>): Iterable<B> { 
  for (const x of xs)
    yield f(x)
}

export function* filter<A>(p: (x: A) => boolean, xs: Iterable<A>): Iterable<A> {
  for (const x of xs)
    if (p(x))
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