import getAryRandomItem from './getAryRandomItem';

const generateTextFromTxt = async (text: string) => {
  let replacing = text.replace(/[，。“”‘’]/g, '|');
  for (let i = 0; i < 3; i += 1) {
    replacing = replacing.replaceAll('\r\n\r\n', '\r\n');
    replacing = replacing.replaceAll('\n\n', '\n');
  }
  replacing = replacing.replaceAll('\r\n', '|');
  replacing = replacing.replaceAll('\n', '|');
  replacing = replacing.replaceAll(' ', ''); // Comment it if you're not CJK user.
  for (let i = 0; i < 3; i += 1) {
    replacing = replacing.replaceAll('||', '|');
  }
  const ary = replacing.split('|');
  let outputStr = '';
  const punctuationAry = ['，', '，', '，', '，', '，', '，', '。', '。', '。', '！', '？'];
  for (let i = 0; i < 10; i += 1) {
    outputStr += getAryRandomItem(ary);
    outputStr += getAryRandomItem(punctuationAry);
  }
  return outputStr;
};

export default generateTextFromTxt;
