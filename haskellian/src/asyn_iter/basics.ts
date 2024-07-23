export async function* enumerate<A>(xs: AsyncIterable<A>): AsyncIterable<[A, number]> {
  let i = 0
  for await (const x of xs)
    yield [x, i++]
}

export async function* map<A, B>(xs: AsyncIterable<A>, f: (x: A, idx: number) => B): AsyncIterable<B> {
  for await (const [x, i] of enumerate(xs))
    yield f(x, i)
}

export async function* filter<A>(xs: AsyncIterable<A>, p: (x: A, idx: number) => unknown): AsyncIterable<A> {
  for await (const [x, i] of enumerate(xs))
    if (p(x, i))
      yield x
}

export async function* flatmap<A, B>(xs: AsyncIterable<A>, f: (x: A) => AsyncIterable<B>): AsyncIterable<B> {
  for await (const x of xs)
    for await (const y of f(x))
      yield y
}

export async function syncify<A>(xs: AsyncIterable<A>): Promise<A[]> {
  const res: A[] = []
  for await (const x of xs)
    res.push(x)
  return res
}