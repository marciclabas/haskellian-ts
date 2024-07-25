export function stripSlash(url: string) {
  return url.endsWith('/') ? url.slice(0, -1) : url
}

export function urlJoin(...parts: string[]) {
  return parts.map(stripSlash).join('/')
}