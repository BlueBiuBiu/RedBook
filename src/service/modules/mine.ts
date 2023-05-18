import {Request} from '..';

interface pagination {
  page: number;
  size?: number;
}

// 消息列表
export function getNoteList() {
  return Request.get<any>({
    url: '/mine/noteList',
  });
}

export function getCollectionListList() {
  return Request.get<any>({
    url: '/mine/collectionList',
  });
}

export function getFavorateListList() {
  return Request.get<any>({
    url: '/mine/favorateList',
  });
}
