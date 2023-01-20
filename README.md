# zod-file

[![npm](https://img.shields.io/npm/v/zod-file.svg)](https://www.npmjs.com/package/zod-file)
[![Code style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/alecdotbiz)

> Binary and base64 validators

&nbsp;

### Usage

Extend `zod` with a custom module, like `src/zod.ts` in your project:

```ts
export * from 'zod'
export * from 'zod-file'
```

Use it in your schema:

```ts
import * as z from './zod'

const User = z.object({
  avatar: z.base64(),
})

const parsedUser = User.parse({
  // Pass a buffer or a base64 string.
  avatar: fs.readFileSync('avatar.png'),
})

// Receive a base64 string.
const base64Avatar = parsedUser.avatar

// Invalid base64 strings will throw.
User.parse({
  avatar: 'not base64',
})
```
