import { asyncify, syncify, map, filter, flatmap, enumerate, flatten } from './basics.ts'
import { batch } from './batching.ts';
import { head, pad, skip, tail, take, uncons } from './slicing.ts'

export class AsynIter<A> implements AsyncIterable<A> {
  constructor(private xs: AsyncIterable<A>) {}

  static of<A>(xs: Iterable<A>): AsynIter<A> {
    return new AsynIter(asyncify(xs))
  }
  
  [Symbol.asyncIterator]() {
    return (this.xs[Symbol.asyncIterator])()
  }

  async sync() {
    return await syncify(this)
  }

  map<B>(f: (x: A, idx: number) => B): AsynIter<B> {
    return new AsynIter(map(f, this))
  }

  filter(p: (x: A, idx: number) => unknown): AsynIter<A> {
    return new AsynIter(filter(p, this))
  }

  flatmap<B>(f: (x: A) => AsyncIterable<B>): AsynIter<B> {
    return new AsynIter(flatmap(f, this))
  }

  enumerate(): AsynIter<[number, A]> {
    return new AsynIter(enumerate(this))
  }

  async empty(): Promise<boolean> {
    const [x, xs] = await uncons(this.xs)
    if (!x)
      return true
    this.xs = flatten([[x], xs])
    return false
  }

  take(n: number): AsynIter<A> {
    return new AsynIter(take(n, this.xs))
  }

  async head(): Promise<A | undefined> {
    return await head(this.xs)
  }

  tail(): AsynIter<A> {
    return new AsynIter(tail(this.xs))
  }

  batch(n: number): AsynIter<A[]> {
    return new AsynIter(batch(n, this.xs))
  }

  skip(n: number): AsynIter<A> {
    return new AsynIter(skip(n, this.xs))
  }
  
  pad(n: number, x: A): AsynIter<A> {
    return new AsynIter(pad(n, x, this.xs))
  }
}