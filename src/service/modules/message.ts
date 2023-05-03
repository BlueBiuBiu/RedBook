import {Request} from '..';

interface pagination {
  page: number;
  size?: number;
}

// 消息列表
export function getMessageList({page, size = 8}: pagination) {
  return Request.get<any>({
    url: '/message/messageList',
    params: {
      page,
      size,
    },
  });
}
