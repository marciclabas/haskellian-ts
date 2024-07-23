import { syncify, map, filter, flatmap, enumerate } from './basics.ts'

export class AsynIter<A> implements AsyncIterable<A> {
  constructor(private xs: AsyncIterable<A>) {}

  [Symbol.asyncIterator]() {
    return this.xs[Symbol.asyncIterator]()
  }

  async sync() {
    return await syncify(this)
  }

  map<B>(f: (x: A, idx: number) => B): AsynIter<B> {
    return new AsynIter(map(this, f))
  }

  filter(p: (x: A, idx: number) => unknown): AsynIter<A> {
    return new AsynIter(filter(this, p))
  }

  flatmap<B>(f: (x: A) => AsyncIterable<B>): AsynIter<B> {
    return new AsynIter(flatmap(this, f))
  }

  enumerate(): AsynIter<[A, number]> {
    return new AsynIter(enumerate(this))
  }
}