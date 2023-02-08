#!/usr/bin/env node

import { createInterface } from 'readline';
// создание интерфейса
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
// promise с приветствием
const question1 = () => new Promise((resolve) => {
  rl.question('Welcome to the Brain Games!\nMay I have your name?\n', (answer) => {
    console.log(`Hello, ${answer}!`);
    resolve(answer);
  });
});
// promise с игрой
const question2 = (name) => {
  // создание массива
  const arr = [];
  const randomStep = Math.ceil(Math.random(0, 1) * 10); // шаг прогрессии (рандомный)
  const randomIncr = Math.ceil(Math.random(0, 1) * 10);
  for (let i = 1; i < 11; i++) { // цикл заполняющий массив
    arr.push((i * randomStep) + randomIncr);
  }
  const arrClone = [...arr]; // клонирование массива
  const randomHide = Math.round(Math.random() * arrClone.length);
  arrClone[randomHide] = '..'; // замена клонированного числа на '..'
  const hideNum = arrClone.indexOf('..'); // определения индекса '..'
  const showNum = arr[hideNum]; // определение значения в оригинальном массиве

  return new Promise((resolve) => {
    rl.question(`Question: ${arrClone.join(' ')}\n`, (answer) => {
      console.log(`Your answer: ${answer}`);
      if (answer == showNum) {
        // верный ответ
        console.log('Correct!');
        resolve(true);
      } else {
        // неверный ответ
        console.log(`'${answer}' is wrong answer ;(. Correct answer was '${showNum}'. Let's try again, ${name}!`);
        resolve(false);
      }
    });
  });
};

const main = async () => {
  console.log('brain-progression\n');
  // valueQue1 для получения значения из question1()
  const valueQue1 = await question1();
  console.log('What number is missing in the progression?');
  // создание условия, при котором пользователь, ответив верно 3 раза, выигрывает
  if (await question2(valueQue1) == true) {
    if (await question2(valueQue1) == true) {
      if (await question2(valueQue1) == true) {
        console.log(`Congratulations, ${valueQue1}!`);
      }
    }
  }
  rl.close();
};

main();
