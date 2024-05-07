import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { UserAccount } from 'src/auth/interfaces';
import { UsageRegister } from 'src/pay/interfaces';
import { UsageRegisterUseCase } from 'src/pay/use-cases';
import { TranslateDto } from '../dtos';

@Injectable()
export class TranslateUseCase {
  private readonly logger = new Logger('TranslateUseCase');

  constructor(
    
    private readonly usageRegisterUseCase: UsageRegisterUseCase,
  ) {}

  async execute(openai: OpenAI, translateDto: TranslateDto, user: UserAccount) {
  const { model, prompt, lang } = translateDto;

  

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
            Traduce el siguiente texto al idioma ${lang}:${prompt}
    
          `,
      },
    ],
    model: model,
    temperature: 0.2,
    // max_tokens: 150,
  });

  const usageRegister: UsageRegister = {
    model: model,
    inputText: prompt,
    outputText: completion.choices[0].message.content ?? '',
    serviceName: 'text'
  }
  
  try {
    const usage = await this.usageRegisterUseCase.execute(usageRegister, user);
    return { message: completion.choices[0].message.content, usage };
    
  } catch (error) {
    throw new BadRequestException(error.message);
  }


  }

}
