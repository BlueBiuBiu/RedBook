export function formatPhone(phone: string): string {
  phone = phone.replace(/\s+/g, '');
  const value = [phone.slice(0, 3), phone.slice(3, 7), phone.slice(7, 11)];
  const res = value.filter((item: any) => !!item).join(' ');
  return res;
}

/**
 * 去除字符串空格
 * @param str 
 * @returns 
 */
export function replaceBlank(str: string): string {
  return str.replace(/\s+/g, '');;
}
