interface IMessage {
  id: number;
  name: string;
  avatarUrl: string;
  lastMessage: string;
  lastMessageTime: number;
}

interface IRenderItem {
  item: IMessage,
  index: number
}