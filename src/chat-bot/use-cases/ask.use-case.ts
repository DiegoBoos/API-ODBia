import { ChatOpenAI } from '@langchain/openai';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HumanMessage } from '@langchain/core/messages';

import { UserAccount } from 'src/auth/interfaces';
import { UsageRegister } from 'src/pay/interfaces';
import { UsageRegisterUseCase } from 'src/pay/use-cases';
import { ChatDto } from '../dtos/chat.dto';

@Injectable()
export class AskUseCase {
  private readonly logger = new Logger('AskUseCase');

  constructor(private readonly usageRegisterUseCase: UsageRegisterUseCase) {}

  async execute(chatDto: ChatDto, user: UserAccount) {
    const { humanMessage, model } = chatDto;

    const chatOpenAI = new ChatOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      model,
      temperature: 0.2,
    });

    const aiMessage = await chatOpenAI.invoke([new HumanMessage(humanMessage)]);

    const { content, response_metadata } = aiMessage;

    // const usageRegister: UsageRegister = {
    //   model: model,
    //   inputText: prompt,
    //   outputText: completion.choices[0].message.content ?? '',
    //   serviceName: 'text',
    // };

    // try {
    //   const usage = await this.usageRegisterUseCase.execute(
    //     usageRegister,
    //     user,
    //   );
    //   return { message: completion.choices[0].message.content, usage };
    // } catch (error) {
    //   throw new BadRequestException(error.message);
    // }

    return {
      content,
      response_metadata
    };
    //   const completion = await chatOpenAI.chat.completions.create({
    //     messages: [
    //       {
    //         role: 'system',
    //         content: `
    //             Traduce el siguiente texto al idioma ${lang}:${prompt}

    //           `,
    //       },
    //     ],
    //     model: model,
    //     temperature: 0.2,
    //     // max_tokens: 150,
    //   });
  }
}
