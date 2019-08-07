import Dexie from "dexie";

export default class idb {
  constructor() {
    this.db = new Dexie('UserThreadDatabase');
    this.db.version(1).stores({
      chats: "username, threadIds",
      threads: "++id"
    })
    // this.db.threads.put({
    //   id: 0,
    //   messages: [
    //     {message:'hi maverick', sender:'minsun'}, 
    //     {message:'hi minsun', sender:'mav'}
    //   ]
    // })
    // this.db.threads.put({
    //   id: 1,
    //   messages: [
    //     {message:'hi maverick', sender:'bobert'}, 
    //     {message:'hi bobert', sender:'mav'}
    //   ]
    // })
    // this.db.chats.put({
    //   username: 'mav', 
    //   threads: {
    //     'minsun': 0, 
    //     'bobert': 1 
    //   }
    // })
    // this.db.chats.put({
    //   username: 'minsun', 
    //   threads: {
    //     'mav': 0
    //   }
    // })
    // this.db.chats.put({
    //   username: 'bobert', 
    //   threads: {
    //     'mav': 1
    //   }
    // })
  }

  async loadMessagesToChatboxes(username) {
    const chatThreads = await this.db.chats.get(username);
    console.log(chatThreads)
    const threadIds = Object.entries(chatThreads.threads);
    console.log(threadIds)
    const chatboxStates = await Promise.all(threadIds.map(async ([recipient, threadId]) => {
      const thread = await this.db.threads.get(threadId);
      const messages = thread.messages;
      return { recipient, messages }
    }));
    console.log(chatboxStates)
    return chatboxStates;
  }

  async loadHistoryToChatbox(username, recipient) {
    const chatThreads = await this.db.chats.get(username);
    if (!chatThreads) {
      return { recipient, messages: [] }
    }
    const threadId = chatThreads.threads[recipient];
    if (threadId === undefined) {
      return { recipient, messages: [] }
    }
    const thread = await this.db.threads.get(threadId);
    const messages = thread.messages;
    return { recipient, messages }
  }

  async saveMessage(username, recipient, newMessageObj) {
    const chatThreads = await this.db.chats.get(username);
    if (!chatThreads) {
      const newThreadId = await this.db.threads.add({ messages: [newMessageObj] });
      await this.db.chats.add({ username, threads: { [recipient]: newThreadId } })
      return
    }
    const threadId = chatThreads.threads[recipient];
    if (threadId === undefined) {
      const newThreadId = await this.db.threads.add({ messages: [newMessageObj] });
      const newThreads = {
        ...chatThreads.threads,
        [recipient]: newThreadId
      }
      this.db.chats.update(username, { threads: newThreads })
    } else {
      const thread = await this.db.threads.get(threadId);
      const messages = thread.messages;
      const newMessages = [ ...messages, newMessageObj ];
        this.db.threads.update(threadId, { messages: newMessages })
    }
  }
}
