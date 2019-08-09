import Dexie from "dexie";

export default class idb {
  constructor() {
    this.db = new Dexie('UserThreadDatabase');
    this.db.version(1).stores({
      chats: "username, threadIds",
      threads: "++id"
    })
  }

  async loadMessagesToChatboxes(username) {
    const chatThreads = await this.db.chats.get(username);
    const threadIds = Object.entries(chatThreads.threads);
    const chatboxStates = await Promise.all(threadIds.map(async ([recipient, threadId]) => {
      const thread = await this.db.threads.get(threadId);
      const messages = thread.messages;
      return { recipient, messages }
    }));
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
    console.log(username, recipient, newMessageObj)
    const chatThreads = await this.db.chats.get(username);
    if (!chatThreads) {
      const newThreadId = await this.db.threads.add({ messages: [newMessageObj] });
      await this.db.chats.add({ username, threads: { [recipient]: newThreadId } })
      console.log('new username generated')
      return
    }
    const threadId = chatThreads.threads[recipient];
    if (threadId === undefined) {
      const newThreadId = await this.db.threads.add({ messages: [newMessageObj] });
      const newThreads = {
        ...chatThreads.threads,
        [recipient]: newThreadId
      }
      console.log('new thread with', recipient, 'generated')
      this.db.chats.update(username, { threads: newThreads })
    } else {
      const thread = await this.db.threads.get(threadId);
      const messages = thread.messages;
      const newMessages = [ ...messages, newMessageObj ];
      this.db.threads.update(threadId, { messages: newMessages });
      console.log('new message with', recipient, 'saved')
    }
  }
}
