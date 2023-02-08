#!/usr/bin/env node

import { createInterface } from "readline";
//создание интерфейса
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
//promise с приветствием
let question1 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Welcome to the Brain Games!\nMay I have your name?\n', (answer) => {
      console.log(`Hello, ${answer}!`);
      resolve(answer);
    })
  })
}
//promise с игрой
let question2 = (name) => {
  // создание массива
  let arr = [];
  //шаг прогрессии (рандомный)
  let randomStep = Math.ceil(Math.random(0, 1)*10);
  let randomIncr = Math.ceil(Math.random(0, 1)*10);
  //цикл заполняющий массив
  for (let i = 1; i < 11; i++) {
    arr.push((i*randomStep)+randomIncr);
  }
  //клонирование массива
  let arrClone = [...arr];
  //замена клонированного числа на '..'
  let randomHide = Math.round(Math.random()*arrClone.length)
  arrClone[randomHide] = '..';
  //определения индекса '..'
  let hideNum = arrClone.indexOf('..');
  //определение значения в оригинальном массиве
  let showNum = arr[hideNum];

  return new Promise((resolve, reject) => {
    rl.question(`Question: ${arrClone.join(' ')}\n`, (answer) => {
      console.log(`Your answer: ${answer}`)
      if (answer == showNum){
        //верный ответ
        console.log('Correct!');
        resolve(true);
      } else {
        //неверный ответ
        console.log(`'${answer}' is wrong answer ;(. Correct answer was '${showNum}'. Let's try again, ${name}!`);
        resolve(false);
      }
    })
  })
}

let main = async () => {
  console.log('brain-progression\n');
  //valueQue1 для получения значения из question1()
  let valueQue1 = await question1();
  console.log('What number is missing in the progression?');
  //создание условия, при котором пользователь, ответив верно 3 раза, выигрывает
  if (await question2(valueQue1) == true){
    if(await question2(valueQue1) == true){
      if (await question2(valueQue1) == true){
        console.log(`Congratulations, ${valueQue1}!`);
      }
    }
  };
  rl.close();
}

main();