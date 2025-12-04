import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsNoEmoji(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNoEmoji',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return true;

          const emojiRegex =
            /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;

          return !emojiRegex.test(value);
        },
        defaultMessage() {
          return '$property cannot contain emojis or special symbols';
        },
      },
    });
  };
}
