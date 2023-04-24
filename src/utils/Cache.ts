import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageCache {
  setCache(key: string, value: any) {
    AsyncStorage.setItem(key, JSON.stringify(value));
  }
  async getCache(key: string) {
    const res = await AsyncStorage.getItem(key);
    
    if (res) {
      return JSON.parse(res);
    } else {
      return [];
    }
  }
  deleteCache(key: string) {
    AsyncStorage.removeItem(key);
  }
  clearCache() {
    AsyncStorage.clear();
  }
}

export default new StorageCache();
