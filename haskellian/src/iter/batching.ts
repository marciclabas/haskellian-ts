export function* batch<A>(n: number, xs: Iterable<A>): Iterable<A[]> {
  let batch: A[] = []
  for (const x of xs) {
    batch.push(x)
    if (batch.length === n) {
      yield batch
      batch = []
    }
  }
  yield batch
}