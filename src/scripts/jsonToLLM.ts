// input interface for optimizer function, taken from output of textToJson.ts
export interface Chat {
  date: Date;
  name: string;
  content: {
    text: string;
    attach: string;
    event: string;
    reacts: number;
  };
}

// optimizer ouput will only hold name and message
export interface OptimizedMessage {
  n: string;    // name
  m: string;    // message content
}

export function optimizeChatsForLLM(chats: Chat[], tokenLimit: number = 4096): OptimizedMessage[] {
  const optimizedMessages: OptimizedMessage[] = [];
  let currentTokenCount = 0;
  
  // reserve tokens for system prompt and JSON structure
  const SYSTEM_PROMPT_TOKENS = 150;
  const JSON_STRUCTURE_TOKENS = 50;
  const SAFETY_MARGIN = 0.9; // Use 90% of limit for safety
  
  // calculate actual available tokens for messages
  const availableTokens = Math.floor((tokenLimit * SAFETY_MARGIN)) - SYSTEM_PROMPT_TOKENS - JSON_STRUCTURE_TOKENS;
  
  // still using string length but with better multipliers
  const estimateTokens = (message: OptimizedMessage): number => {
    const messageStr = JSON.stringify(message);
    const specialChars = (messageStr.match(/[^\w\s]/g) || []).length;
    const words = messageStr.split(/\s+/).length;
    
    // base estimation using character length
    const baseTokens = Math.ceil(messageStr.length / 4);
    // add extra tokens for special characters and word boundaries
    const extraTokens = Math.ceil((specialChars * 0.5) + (words * 0.5));
    
    return baseTokens + extraTokens;
  };

  // process messages until we hit the token limit
  for (const chat of chats) {
    if (chat.content.text.trim() === '') continue;

    const message: OptimizedMessage = {
      n: chat.name.trim(),
      m: chat.content.text.trim().substring(0, 200) // truncating very long messages
    };

    const messageTokens = estimateTokens(message);

    // if adding this message would exceed the available tokens, stop processing
    if (currentTokenCount + messageTokens > availableTokens) {
      console.log(`Reached token limit. Stopping at ${currentTokenCount}/${availableTokens} available tokens`);
      break;
    }

    // add message and update token count
    optimizedMessages.push(message);
    currentTokenCount += messageTokens;
  }

  console.log(`Total messages: ${optimizedMessages.length}/${chats.length}`);
  console.log(`Estimated total tokens: ${currentTokenCount}/${availableTokens}`);
  console.log(`Safety margin tokens remaining: ${availableTokens - currentTokenCount}`);
  
  return optimizedMessages;
}