import {
  INVALID,
  ParseInput,
  ParseReturnType,
  ZodIssueCode,
  ZodType,
  ZodTypeDef,
  addIssueToContext,
} from 'zod'

const base64Regex =
  /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/

export interface ZodBase64Def extends ZodTypeDef {
  typeName: 'ZodBase64'
}

// Write a ZodType subclass that takes a base64 string or Node.js `Buffer` as input and outputs a base64 string
export class ZodBase64 extends ZodType<string, ZodBase64Def, string | Buffer> {
  _parse(input: ParseInput): ParseReturnType<string> {
    const { ctx, status } = this._processInputParams(input)
    const value = input.data

    if (Buffer.isBuffer(value)) {
      return {
        value: value.toString('base64'),
        status: status.value,
      }
    }

    if (typeof value === 'string') {
      if (!base64Regex.test(value)) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.custom,
          message: 'Invalid base64 string',
        })
        return INVALID
      }
      return {
        value,
        status: status.value,
      }
    }

    addIssueToContext(ctx, {
      code: ZodIssueCode.custom,
      message: 'Expected a base64 string or a Buffer object',
    })
    return INVALID
  }

  static create() {
    return new ZodBase64({
      typeName: 'ZodBase64',
    })
  }
}
