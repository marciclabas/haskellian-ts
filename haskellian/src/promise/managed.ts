import { PromiseState } from './state.ts'

/** A promise that's resolved/rejected via the `resolve/reject` methods, plus it's state (`PromiseState`) */
export type ManagedPromise<L, R> = Promise<R> & {
  resolve(x: R): void
  reject(reason: L): void
} & PromiseState<L, R>

/** A promise with methods to resolve/reject it + direct access to its state
 * 
 * ```javascript
 * const loaded = managedPromise()
 * img.onload = () => loaded.resolve()
 * img.src = '...'
 * await loaded
 * ```
 */
export function managedPromise<R = void, L = any>(): ManagedPromise<L, R> {
  let resolve: (x: R) => void = () => {}
  let reject: (reason: L) => void = () => {}
  let state: PromiseState<L, R> = { status: 'pending' }
  const promise = new Promise<R>((rs, rj) => {
    resolve = value => { state = { status: 'resolved', value }; rs(value) }
    reject = reason => { state = { status: 'rejected', reason }; rj(reason) }
  })
  return Object.assign(promise, { resolve, reject, ...state })
}
