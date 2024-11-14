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

export function optimizeChatsForLLM(chats: Chat[], tokenLimit: number = 30000): OptimizedMessage[] {
  // takes an array of Chat objects and returns a 2D array of optimized messages.
  // const optimizedMessages = chats
  //   .filter(chat => chat.content.text.trim() !== '')  // remove empty messages
  //   .map(chat => ({
  //     n: chat.name.trim(),
  //     m: chat.content.text.trim()
  // }));
  const optimizedMessages: OptimizedMessage[] = [];
  let currentTokenCount = 0;
  console.log("Optimized messages: ", optimizedMessages);
  
  // batch messages
  // when tokens > 8k, split into multiple batches
  // qwen 1.5B can handle 32k tokens in its context window...but setting it to 32k will increase client side processing time
  // a better solution is implementing batching - split into multiple batches of 8k tokens and summarize each batch
  // we could use this two ways:
      // 1. display each batch summary in a card as they are processed
      // 2. combine all batches into a single summary...this doesnt make sense if we want to make the process faster for the user.
      // 3. 

  // const batches: OptimizedMessage[][] = []; // holds all batches
  // let currentBatch: OptimizedMessage[] = []; // current batch being built
  // let currentTokenCount = 0; // token count for current batch

  // one word can be about 2-3 tokens...so we can estimate the number of tokens by dividing the length of the string by 4
  // overestimating by using 4 here just to be safe
  const estimateTokens = (message: OptimizedMessage): number => {
    return Math.ceil(JSON.stringify(message).length / 4);
  };
  
  // eatimate tokens for each message in OptimizedMessage
  // if adding message exceeds token limit, push current batch to batches and start a new batch

  // for (const message of optimizedMessages) {
  //   const messageTokens = estimateTokens(message);
    
  //   if (currentTokenCount + messageTokens > tokenLimit) {
  //     if (currentBatch.length > 0) {
  //       batches.push(currentBatch);
  //     }
  //     currentBatch = [message];
  //     currentTokenCount = messageTokens;
  //   } else {
  //     currentBatch.push(message);
  //     currentTokenCount += messageTokens;
  //   }
  // }
  
  // push the last batch
  // if (currentBatch.length > 0) {
  //   batches.push(currentBatch);
  // }

  // process messages until we hit the token limit
  for (const chat of chats) {
    
    if (chat.content.text.trim() === '') continue;

    const message: OptimizedMessage = {
      n: chat.name.trim(),
      m: chat.content.text.trim().substring(0, 200) // truncating very long messages
    };

    const messageTokens = estimateTokens(message);

    // If adding this message would exceed the token limit, stop processing
    if (currentTokenCount + messageTokens > tokenLimit) {
      break;
    }

    // Add message and update token count
    optimizedMessages.push(message);
    currentTokenCount += messageTokens;
  }
  console.log(`Total messages: ${optimizedMessages.length}`);
  console.log(`Estimated total tokens: ${Math.ceil(JSON.stringify(optimizedMessages).length / 4)}`);
  console.log("Optimized messages: ", optimizedMessages);
  //return batches;
  return optimizedMessages;
}