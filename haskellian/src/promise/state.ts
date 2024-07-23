/** The state of a promise, reified */
export type PromiseState<L, R> = {
  status: 'pending'
} | {
  status: 'resolved' 
  value: R
} | {
  status: 'rejected'
  reason: L
}
