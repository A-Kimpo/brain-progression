import { createInterface } from 'readline';
// создание интерфейса
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
// promise с получением имени игрока
const requestUserName = () => new Promise((resolve) => {
  rl.question('Welcome to the Brain Games!\nMay I have your name?\n', (answer) => {
    console.log(`Hello, ${answer}!`);
    resolve(answer);
  });
});
// promise с началом игры
const startRound = (name) => {
  // создание массива
  const arr = [];
  const randomStep = Math.ceil(Math.random(0, 1) * 10); // шаг прогрессии (рандомный)
  const randomIncr = Math.ceil(Math.random(0, 1) * 10);
  for (let i = 1; i < 11; i++) { // цикл заполняющий массив
    arr.push((i * randomStep) + randomIncr);
  }
  const arrClone = [...arr]; // клонирование массива
  const randomHide = Math.floor(Math.random(0, 1) * arrClone.length);
  arrClone[randomHide] = '..'; // замена числа на '..'
  const hideNum = arr[randomHide];

  return new Promise((resolve) => {
    rl.question(`Question: ${arrClone.join(' ')}\n`, (answer) => {
      console.log(`Your answer: ${answer}`);
      if (Number(answer) === hideNum) {
        // верный ответ
        console.log('Correct!');
        resolve(true);
      } else {
        // неверный ответ
        console.log(`'${answer}' is wrong answer ;(. Correct answer was '${hideNum}'. Let's try again, ${name}!`);
        resolve(false);
      }
    });
  });
};

const main = async () => {
  console.log('brain-progression\n');
  // переменная для получения значения из requestUserName()
  const valueUserName = await requestUserName();
  console.log('What number is missing in the progression?');
  // добавление счетчика верных ответов, при 3 верных подряд игрок побеждает
  let rightAnswCount = 0;
  let gameOver = false;
  do {
    // eslint-disable-next-line no-await-in-loop
    if (await startRound(valueUserName) === true) {
      rightAnswCount += 1;
    } else {
      gameOver = true;
      rightAnswCount = 0;
    }
  } while (rightAnswCount !== 3 && gameOver !== true);
  if (rightAnswCount === 3) {
    console.log(`Congratulations, ${valueUserName}!`);
  }
  rl.close();
};

export { main };
