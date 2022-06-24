'use strict';

(() =>{
  class Game{
    constructor(num, cou, spe, use, img, mai){
      this.main = mai;
      this.display = document.querySelector('.display > p');
      this.form = document.querySelector('form');
      this.input = document.querySelector('form > input');
      this.answerBtn = document.getElementById('answer');
      this.levelNumber = num;
      this.levelCount = cou;
      this.levelSpeed = spe;
      this.userRank = use;
      this.number = 0;
      this.count = 0;
      this.answer = 0;

      this.result = document.querySelector('.result');
      this.resultCorrect = document.querySelector('.result > h1');
      this.resultImage = document.querySelector('.result > img');
      this.resultText = document.querySelector('.result > p');
      this.resultImages = img;

      this.ranks = [
        '駆け出し暗算士',
        '期待の暗算ルーキー',
        '期待の暗算ルーキー',
        '暗算エキスパート',
        '暗算エキスパート',
        '暗算マスター',
        '暗算ゴッド',
      ];

      this.answerBtn.addEventListener('click', e =>{
        e.preventDefault();
        this.resultScene();
      });

      this.question();
    }

    question(){
      if(this.display.textContent !== ''){
        this.display.textContent = '';
      } else {
        this.number = Math.floor(Math.random() * (this.levelNumber - (this.levelNumber / 10)) + (this.levelNumber / 10));
        this.display.textContent = `${this.number}`;

        this.answer += this.number;
      }

      this.count++;
      if(this.count === this.levelCount * 2){
        setTimeout(() =>{
          this.display.classList.add('finish');
          this.display.textContent = "Let's, Answer!";

          this.form.classList.remove('hidden');
        }, this.levelSpeed);
        return;
      }

      setTimeout(() =>{
        this.question();
      }, this.levelSpeed);
    }

    resultScene(){
      if(this.input.value === `${this.answer}`){
        this.resultCorrect.textContent = '正解！';
        this.resultImage.src = `${this.resultImages[0]}`;
        this.resultText.textContent = `あなたは『${this.ranks[userRank]}』です！`;
      } else {
        this.resultCorrect.textContent = '不正解！';
        this.resultImage.src = `${this.resultImages[1]}`;
        this.resultText.textContent = `正解は『${this.answer}』でした！`;
      }

      this.result.classList.remove('hidden');
      this.main.classList.add('hidden');
    }
  }

  const images = [
    'img/result01.jpeg',
    'img/result02.jpeg',
  ];

  const title = document.querySelector('.title');
  const rule = document.querySelector('.rule');
  const startBtn = document.getElementById('start');
  const openBtn = document.getElementById('open');
  const closeBtn = document.getElementById('close');
  const main = document.querySelector('main');
  const numbers = document.querySelectorAll('.number');
  const counts = document.querySelectorAll('.count');
  const speeds = document.querySelectorAll('.speed');

  let levelNumber = 0;
  let levelCount = 0;
  let levelSpeed = 0;
  let userRank = 0;

  for(let i = 0; i < images.length; i++){
    const preloadImage = document.createElement('img');
    preloadImage.src = images[i];
  }

  startBtn.addEventListener('click', () =>{
    if(!rule.classList.contains('hidden')){
      return;
    }

    numbers.forEach((number, index) =>{
      if(number.checked){
        levelNumber = number.value;
        userRank += index;
      }
    });

    counts.forEach((count, index) =>{
      if(count.checked){
        levelCount = count.value;
        userRank += index;
      }
    });

    speeds.forEach((speed, index) =>{
      if(speed.checked){
        levelSpeed = speed.value;
        userRank += index;
      }
    });

    main.classList.remove('hidden');
    title.classList.add('hidden');
    
    new Game(levelNumber, levelCount, levelSpeed, userRank, images, main);
  });

  openBtn.addEventListener('click', () =>{
    rule.classList.remove('hidden');
  });

  closeBtn.addEventListener('click', () =>{
    rule.classList.add('hidden');
  });
})();