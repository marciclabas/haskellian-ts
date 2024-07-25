export async function* enumerate<A>(xs: AsyncIterable<A>): AsyncIterable<[number, A]> {
  let i = 0
  for await (const x of xs)
    yield [i++, x]
}

export async function* map<A, B>(f: (x: A, idx: number) => B, xs: AsyncIterable<A>): AsyncIterable<B> {
  for await (const [i, x] of enumerate(xs))
    yield f(x, i)
}

export async function* filter<A>(p: (x: A, idx: number) => unknown, xs: AsyncIterable<A>): AsyncIterable<A> {
  for await (const [i, x] of enumerate(xs))
    if (p(x, i))
      yield x
}

export async function* flatmap<A, B>(f: (x: A) => Iterable<B> | AsyncIterable<B>, xs: AsyncIterable<A>): AsyncIterable<B> {
  for await (const x of xs)
    for await (const y of f(x))
      yield y
}

export function flatten<A>(xxs: Iterable<Iterable<A> | AsyncIterable<A>>): AsyncIterable<A>
export function flatten<A>(xxs: AsyncIterable<Iterable<A> | AsyncIterable<A>>): AsyncIterable<A>
export async function* flatten(xxs) {  
  yield* flatmap(x => x as any, xxs) // @ts-ignore shut the fuck up deno
}

export async function* asyncify<A>(xs: Iterable<A>): AsyncIterable<A> {
  yield* xs
}

export async function syncify<A>(xs: AsyncIterable<A>): Promise<A[]> {
  const res: A[] = []
  for await (const x of xs)
    res.push(x)
  return res
}