import { Provider } from '@nestjs/common';

import { IMailjetModuleOptions } from './interfaces/mailjet-module-options.interface';
import { MAILJET_MODULE_OPTIONS } from './constants/mailjet.constans';

export function createMailjetProvider(
  options: IMailjetModuleOptions
): Provider[] {
  return [
    {
      provide: MAILJET_MODULE_OPTIONS,
      useValue: options || {},
    },
  ];
}
