import { flatten, filter, map, range, enumerate } from './basics.ts';
import { uncons, tail, take, head, pad, skip } from './slicing.ts'
import { batch } from './batching.ts'

export class Iter<A> implements Iterable<A> {
  constructor(private xs: Iterable<A>) {}

  static range(end: number): Iter<number>
  static range(start: number, end: number, step?: number): Iter<number>
  static range(start: number, end?: number, step: number = 1): Iter<number> {
    // @ts-ignore-next
    return new Iter(range(start, end, step))
  }

  map<B>(f: (x: A, idx: number) => B): Iter<B> {
    return new Iter(map(f, this.xs))
  }

  filter(p: (x: A, idx: number) => boolean): Iter<A> {
    return new Iter(filter(p, this.xs))
  }

  empty(): boolean {
    const [x, xs] = uncons(this.xs)
    if (!x)
      return true
    this.xs = flatten([[x], xs])
    return false
  }

  take(n: number): Iter<A> {
    return new Iter(take(n, this.xs))
  }

  head(): A | undefined {
    return head(this.xs)
  }

  tail(): Iter<A> {
    return new Iter(tail(this.xs))
  }

  batch(n: number): Iter<A[]> {
    return new Iter(batch(n, this.xs))
  }

  enumerate(): Iter<[number, A]> {
    return new Iter(enumerate(this.xs))
  }

  skip(n: number): Iter<A> {
    return new Iter(skip(n, this.xs))
  }
  
  pad(n: number, x: A): Iter<A> {
    return new Iter(pad(n, x, this.xs))
  }

  [Symbol.iterator]() {
    return this.xs[Symbol.iterator]()
  }

  sync() {
    return [...this.xs]
  }
}