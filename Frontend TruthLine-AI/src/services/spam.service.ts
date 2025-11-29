import { SpamCheck } from '../models/spamCheck.model.js';
import { runClassificationAgent } from '../agents/classificationAgent.js';

interface SpamPayload {
  content: string;
  metadata?: Record<string, unknown>;
}

export const performSpamCheck = async (
  userId: string,
  payload: SpamPayload
) => {
  const classification = await runClassificationAgent(payload.content);

  const spamCheck = await SpamCheck.create({
    user: userId,
    contentSample: payload.content.slice(0, 200),
    riskScore: classification.confidence,
    verdict:
      classification.label === 'phishing' || classification.label === 'spam'
        ? 'spam'
        : classification.label === 'dark-pattern'
        ? 'suspicious'
        : 'clean',
    metadata: { ...payload.metadata, classification }
  });

  return spamCheck;
};

