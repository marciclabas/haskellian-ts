# Haskellian

> The Functional Programming library you need

```bash
npm i haskellian
```

```bash
yarn add haskellian
```

## `Iter<A>`

```typescript
import { Iter } from 'haskellian/iter'

Iter.range(1e9)
  .filter(x => x % 2 === 0)
  .map(x => x * x)
  .batch(2)
  .take(2)
  .sync()
// [[0, 4], [16, 36]]
```

## `AsynIter<A>`

```typescript
import { AsynIter } from 'haskellia/asyn_iter'

AsynIter.of([0, 1, 2, 3, 4, 5, 6, 7, 8])
  .filter(x => x % 2 === 0)
  .map(x => x * x)
  .batch(2)
  .take(2)
  .sync()
// Promise<[[0, 4], [16, 36]]>
```

## `ManagedPromise<A>`

```typescript
import { managedPromise } from 'haskellian/promise'

const promise = managedPromise()
file.onload = () => promise.resolve()
await promise
```

## `ManagedAsync<A>`

```typescript
import { managedAsync } from 'haskellian/asyn_iter'

const messages = managedAsync()

ws.onmessage = e => {
  if (e.data === null)
    messages.end()
  else
    messages.push(e.data)
}

for await (const msg of messages) {
  // ...
}
```

# Bunch of pure utilities

```typescript
import { mod, clamp, urlJoin } from 'haskellian/util'

mod(-1, 4) // 3, instead of the unfortunate -1 % 4 = -1
clamp(0, x, 1) // something in [0, 1]

urlJoin('oh/', '/my/', '/dear/') // 'oh/my/dear/'
```