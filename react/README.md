# Haskellian: React

> Haskellian for React


## Ref-State

```typescript
import { useRefState } from '@haskellian/react'

function Component() {
  const [state, setState, ref] = useRefState(0)
}
```

## Notified State

```typescript
import { useNotifiedState } from '@haskellian/react'

function Component() {
  const [state, setState] = useNotifiedState(0)

  async function update() {
    await setState(x => x + 1)
  }
}
```

## Interval

```jsx
import { useInterval } from '@haskellian/react'

function Component() {
  const { playing, setPlaying } = useInterval((stop) => {
    console.log('Running interval!')
    if (...)
      stop()
  }, { autoplay: false, delaySecs: 0.5 })

  return playing
    ? <button onClick={() => setPlaying(false)}>Pause</button>
    : <button onClick={() => setPlaying(true)}>Play</button>
}

```

## Cancellable Requests

```typescript
import { cancellableRequests } from '@haskellian/react'

const reqs = cancellableRequests({ delaySecs: 10 })

async function request(id) {
  const ok = await reqs.schedule(id)
  if (ok)
    fetch(id)
}

request(id)
request(id) // first one gets cancelled, second executed after `delaySecs`

// or, you can cancel them manually using:
reqs.cancel(id)
```

## `useKeys`

```jsx
import { useKeys } from '@haskellian/react'

function Component() {
  useKeys(['a', 'A'], () => console.log('Turning left!'))
  useKeys(['d', 'D'], () => console.log('Turning right!'))
}

```

## Rotation

```jsx
import { useRotation } from '@haskellian/react'

function Component() {
  const {
    rotation, rotate,
    clockwiseDegrees // for CSS; poor guy doesn't know how angles work
  } = useRotation()

  rotate(-90) // set angle to -90
  rotate('left') // 90 degs to the left
  rotation // actual angle, in degrees (counter-clockwise 0 | 90 | 180 | -90)

  return <img src='...' style={{ transform: `rotate(${clockwiseDegrees})`}} />
}

```

## React Router Tools

### `useSplitPath`

```jsx
function Parent() {
  return useRoutes([{
    path: '/nested/path/*',
    element: <Nested />
  }])
}
 
function Nested() {
  const [pre, post] = useSplitPath() // ['/nested/path', '/children/path']
  return useRoutes([{
    path: '*',
    element: <Navigate to='children/path' />
  }])
}
```

### `useReroute`

Like `useNavigate` but preserves query parameters and hash