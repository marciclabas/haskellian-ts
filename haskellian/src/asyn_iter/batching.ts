export async function* batch<A>(n: number, xs: AsyncIterable<A>): AsyncIterable<A[]> {
  let batch: A[] = []
  for await (const x of xs) {
    batch.push(x)
    if (batch.length === n) {
      yield batch
      batch = []
    }
  }
  yield batch
}