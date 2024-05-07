import { encode } from 'gpt-3-encoder';
import { UsageCalculate } from '../../pay/interfaces';
import { Rate } from '../../pay/entities';

export const calculateUsage = (
  inputText: string,
  outputText: string,
  rate: Rate,
): UsageCalculate => {

  const { costInputPer1k, costOutputPer1k, priceInputPer1k, priceOutputPer1k } = rate;

  const inputTokens = encode(inputText).length;
  const outputTokens = encode(outputText).length;

  const costPrompt = (inputTokens / 1000) * costInputPer1k;
  const costCompletion = (outputTokens / 1000) * costOutputPer1k;
  const totalUsageCost = costPrompt + costCompletion;

  const pricePrompt = (inputTokens / 1000) * priceInputPer1k;
  const priceCompletion = (outputTokens / 1000) * priceOutputPer1k;
  const totalUsagePrice = pricePrompt + priceCompletion;

  return {
    totalUsageCost,
    totalUsagePrice,
    inputTokens,
    outputTokens
  };
};
