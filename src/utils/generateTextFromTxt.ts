import fs from 'fs/promises';
import getAryRandomItem from './getAryRandomItem';

const generateTextFromTxt = async () => {
  const text = (await fs.readFile('./config/randomText.txt')).toString();
  let replacing = text.replace(/[，。“”‘’]/g, '|');
  replacing = replacing.replaceAll('\r\n', '|');
  replacing = replacing.replaceAll('\n', '|');
  replacing = replacing.replaceAll(' ', ''); // Comment it if you're not CJK user.
  replacing = replacing.replaceAll('||', '|');
  replacing = replacing.replaceAll('||', '|');
  replacing = replacing.replaceAll('||', '|');
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
