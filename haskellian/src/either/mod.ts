export type Left<L> = {
  tag: 'left'
  value: L
}
export type Right<R> = {
  tag: 'right'
  value: R
}
export type Either<L, R> = Left<L> | Right<R>

export const left = <L>(value: L): Left<L> => ({ tag: 'left', value })
export const right = <R>(value: R): Right<R> => ({ tag: 'right', value })