/** format an address with ellipses like so 0x3f6q9z52…54h2kjh51h5zfa
 * @param address the address to format
 * @param before number of characters before the ellipses.
 * @param after number of characters after the ellipses.
 * */
export const formatAddress = (address: string, before: number, after: number) => {
  if (address) {
    return `${address.slice(0, before)}...${address.slice(address.length - after)}`;
  }
  return '';
};
