export function getConvertedSlug(input: string): string {
  input = input.toLowerCase();
  const words = input.split(' ');

  for (let i = 0; i < words.length; i++) {
    const word = transliterate(words[i]);
    if (word.length > 0) {
      words[i] = word;
    } else {
      words.splice(i, 1);
      i--;
    }
  }
  return words.join('-');
}

function transliterate(word: string) {
  let answer = '';
  const a: any = {};

  a['ё'] = 'yo';
  a['й'] = 'i';
  a['ц'] = 'ts';
  a['у'] = 'u';
  a['к'] = 'k';
  a['е'] = 'e';
  a['н'] = 'n';
  a['г'] = 'g';
  a['ш'] = 'sh';
  a['щ'] = 'shch';
  a['з'] = 'z';
  a['х'] = 'h';
  a['ъ'] = '';
  a['ф'] = 'f';
  a['ы'] = 'i';
  a['в'] = 'v';
  a['а'] = 'a';
  a['п'] = 'p';
  a['р'] = 'r';
  a['о'] = 'o';
  a['л'] = 'l';
  a['д'] = 'd';
  a['ж'] = 'zh';
  a['э'] = 'e';
  a['я'] = 'ya';
  a['ч'] = 'ch';
  a['с'] = 's';
  a['м'] = 'm';
  a['и'] = 'i';
  a['т'] = 't';
  a['ь'] = '';
  a['б'] = 'b';
  a['ю'] = 'yu';

  for (let i = 0; i < word.length; i++) {
    if (word.charAt(i)) {
      if (a[word.charAt(i)] === undefined) {
        if (/^-?\d+$/.test(word.charAt(i)) || word.charAt(i).match(/[a-z]/i)) answer += word.charAt(i);
      } else {
        answer += a[word.charAt(i)];
      }
    }
  }

  return answer;
}
