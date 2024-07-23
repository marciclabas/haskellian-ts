export type LeftT<L> = {
  tag: 'left'
  value: L
}
export type RightT<R> = {
  tag: 'right'
  value: R
}
export type EitherT<L, R> = LeftT<L> | RightT<R>

export class IsLeft<L> extends Error {
  constructor(public value: L) {
    super()
  }
}

// @ts-ignore-next
export function doN<Ps extends any[], R, L = any>(func: (...args: Ps) => R): (...args: Ps) => Either<L, R>
export function doN<Ps extends any[], R, L = any>(func: (...args: Ps) => Promise<R>): (...args: Ps) => Promise<Either<L, R>>
export function doN(func: any) {
  return (...args: any[]) => {
    try {
      const r = func(...args)
      if (r instanceof Promise)
        return r.then(Either.right).catch(e => {
          if (e instanceof IsLeft) return Either.left(e.value)
          throw e
        })
      return Either.right(r)
    }
    catch (e) {
      if (e instanceof IsLeft) return Either.left(e.value)
      throw e
    }
  }
}

export abstract class Either<L, R> {
  abstract match<T>(onLeft: (value: L) => T, onRight: (value: R) => T): T
  isLeft(): boolean {
    return this.match(() => true, () => false)
  }
  isRight(): boolean {
    return this.match(() => false, () => true)
  }
  unsafe(): R {
    return this.match(x => { throw new IsLeft(x) }, x => x)
  }
  bind<T>(f: (value: R) => Either<L, T>): Either<L, T> {
    return this.match<Either<L, T>>(
      l => new Left(l),
      value => f(value)
    )
  }
  fmap<T>(f: (value: R) => T): Either<L, T> {
    return this.bind(x => new Right(f(x)))
  }
  getOr(fallback: R): R {
    return this.match(() => fallback, x => x)
  }

  static of<L, R>(either: EitherT<L, R>): Either<L, R> {
    switch (either.tag) {
      case 'left':
        return new Left(either.value)
      case 'right':
        return new Right(either.value)
    }
  }
  static left<L>(value: L): Either<L, never> {
    return new Left(value)
  }
  static right<R>(value: R): Either<never, R> {
    return new Right(value)
  }
}

export class Left<L> extends Either<L, never> {
  constructor(private value: L) { super() }
  // @ts-ignore-next
  match<T>(onLeft: (value: L) => T, onRight): T {
    return onLeft(this.value)
  }
}

export class Right<R> extends Either<never, R> {
  constructor(private value: R) { super() }
  // @ts-ignore-next
  match<T>(onLeft, onRight: (value: R) => T): T {
    return onRight(this.value)
  }
}