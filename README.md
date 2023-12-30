## WP Final Project Group 42 - Pixel Game Center

### Member

- 組長：B09502026 林淳彥  
- 組員：B09201004 朱筠濠  

### Introduction

一個用像素風格刻畫的遊戲網站，他支援多方同時進行遊戲，以輸入代碼的方式進入同一個方間並進行遊戲。

### Links

Demo video link: [https://youtu.be/EunKPzUvIjA]
Deploy link: [https://pixel-game-omega.vercel.app/]
Github Repo link: [https://github.com/kylechu0731/pixel-game.git]

### How to play

以Email登入之後可以選擇加入或是創建房間，而若是選擇加入房間需輸入代碼以加入房間，或是用朋友已獲得的房間代碼加入遊戲並進行。

### Reference

Notion-clone（參考auth以及pusher部分）

### Framework

- Frontend: typescript/next.js/tailwindcss  
- Backend: postgresql/railway
- Real-time: pusher

### How to install locally

```bash
yarn
```

```bash
# .env.example
PUSHER_ID=
NEXT_PUBLIC_PUSHER_KEY=
PUSHER_SECRET=
NEXT_PUBLIC_PUSHER_CLUSTER=
```

Fill in your pusher app keys, and disable "Enable authorized connections" in pusher app setting since we found that may cause the client fail to receive messages.

```bash
yarn migrate
# Choose the first option if there's any

yarn dev
```

Then, you may access our app from `localhost:3000`

Since it's a 2-player game, you may need to open 2 tabs. One of them needs to be private!! So that nextauth won't get confused.

You could signup or use the following accounts.

- email: a@gmail.com
- password: 11111111

or

- email: b@gmail.com
- password: 11111111


### 心得

- 朱筠濠：這次專題的製作讓我體會到維持程式碼整潔與邏輯的重要性，因為要和組員協作，必須維持相似的編碼風格，並且在使用變數或hook上也要更加注意scalability的問題，叫Game Center是因為我們希望這個服務可以支援許多不同的遊戲，雖然目前只有一種（四子棋），但在確定一個固定的模式之後，我希望可以把這個app拓展成類似網頁版的世界遊戲大全。

- 林淳彥：這次的專題讓我學到的最多的其實是溝通，在協作的時候有可能會遇到你自己做出來的登入界面不一定和夥伴的想像是一致的，好不容易清楚知道要做什麼之後，又可能因為技術層面上的差異產生一點摩擦，而且在一些功能的使用上也必須要學會妥協，像是原本設想的功能不一定可以如期完成的時候也會要做出取捨，或是不管怎麼樣都找不到bug的時候也會想要狂吃乖乖。