import { Injectable } from '@nestjs/common';

import OpenAI from 'openai';


import { TranslateDto } from './dtos';
import { TranslateUseCase } from './use-cases';
import { UserAccount } from 'src/auth/interfaces';

@Injectable()
export class OpenaiService {

  constructor(
    private readonly translateUseCase: TranslateUseCase
  ){}

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async translateText(translateDto: TranslateDto, user: UserAccount) {
    return await this.translateUseCase.execute(this.openai, translateDto, user);
  }
}
