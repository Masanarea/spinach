

# はじめに

チャットGPTを使用した『AIアシスタントツール』を 
* **<font color="SteelBlue">TypeScript</font>**
* **<font color="SteelBlue">Next.js 13(appディレクトリを採用)</font>**
* **<font color="SteelBlue">AIツール(Chat GPT, GitHub Copilot, OpenAI API)</font>**
* **<font color="SteelBlue">Vercel</font>** 
* **<font color="SteelBlue">PlanetScale</font>**
* **<font color="SteelBlue">その他(Prettier, ESLint, Husky, Axios)</font>**
* **<font color="SteelBlue">Laravel</font>**


等の人気の高まっているモダンな技術を取り入れて、作成してみました。


![スクリーンショット 2023-05-09 8.49.36.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/2980785/c568c271-f9b3-e8c3-3c96-7641084fe968.png)

この記事では、アプリ開発にあたって苦労した点や、
各機能の実装の際に参考にした記事についてもご紹介していければと思います。

※ゴールデンウィーク中に時間があったので、その時に作成しました！😆
※兼ねてから作成してみたかったアプリになります！✨


# URL一覧
URLはこちら↓です。 よければ、ご自由に触ってみてください

#### 「チャットGPTコミュニケーター」 
https://spinach-alpha.vercel.app/test



#### GitHub リポジトリ
フロントエンド(Next.js + TypeScript)

https://github.com/Masanarea/spinach

バックエンド(Laravel API)

https://github.com/Masanarea/api_for_web_app



# アプリのタイトル

「チャットGPTコミュニケーター」 <br>社内コミュニケーションを効率化するAIアシスタントツール

### 使用画面のイメージ

トップページ（この画面だけ)

![スクリーンショット 2023-05-09 8.48.28.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/2980785/7095dcb8-a144-0cb4-95b6-a191ed3b411b.png)

![スクリーンショット 2023-05-09 8.49.36.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/2980785/c568c271-f9b3-e8c3-3c96-7641084fe968.png)



# 使用技術

* __フロントエンド__
  * React.js 18.2.0
  * Next.js 13.3.4 (app ディレクトリ対応)
  * TypeScript 5.0.4
  * Tailwind CSS 3.3.2

* __バックエンド__
  * PHP 8.2.5
  * Laravel 9.46.0

* __インフラ__
  * Vercel(2つプロジェクトを作成、両方 東京リージョン)
  * PlanetScale(MySQL、 東京リージョン)



- **その他使用ツール**
  - Intelチップ搭載 MacBook Air / 　MacOS version 12.1 
  - Visual Studio Code
  - Voice In(chrome拡張機能、音声入力 => Chat GPTに質問する際に時間の短縮を実現)
  - Chat GPT 有料プラン
  - OpenAI API 有料プラン(gpt-3.5-turbo モデルを採用)
  - GitHub(2つリポジトリを作成)
  - Notion （開発中に参考になった記事を管理）
  - PageSpeed Insights（ページに関する実際のパフォーマンスデータを表示/点数化）
  - draw.io(インフラ図やER図の作成)


- **ライブラリ**
  - Prettier(ソースコード整形ツール)
  - ESLint(JavaScriptの静的解析ツールで、構文の誤りを検出)
  - Husky(コミット・プッシュ時にESLintとPrettierで自動修正=>引っかかった場合、コミット不可に)
  - Axios(非同期通信用)


- **VScode 拡張機能(の中でも特に使用したもの)**
  - ChatGPT - Genie AI
  - GitHub Copilot
  - DeepL for Visual Studio Code(日本語<=>英語の翻訳)
  - GistPad(メモ帳代わり)
  - Git Graph(Git管理)
  - REST Client(HTTP リクエストの確認)





- **その他**
  - ローカル環境では、コマンドをカスタマイズして『npm run dev』に代わりに『nrd』(各ワードの頭文字)とターミナルに打ち込めば良いようにカスタム
  - Makefile作成(効率化×コマンド名忘れを防ぐため💦)

## 一言コメント 
サーバーサイドのロジックはPHP/Laravelでプログラミングし、
フロントエンドはNext.js×TypeScript(プロンプト駆動開発)で実装しました。
CI/CDパイプラインに関しては、VercelでSSL化や自動デプロイを行い、
Githubにソースコードを反映しただけで外部公開されるような構成にしています。

※そもそも、コミット・プッシュ時にESLintとPrettierで自動修正した際にエラーがあった際には、
コミットできないように設定しました！

# インフラ構成図(全体構成図)

![infrastructure.drawio (1).png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/2980785/57b3e3a3-08b8-e674-94ec-cdd427f92cd3.png)



# パフォーマンス

![スクリーンショット 2023-05-07 10.57.31.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/2980785/038f8fae-8fd8-aa45-3a6c-93ec390995b3.png)

携帯/デスクトップ共に良いスコアです。(機能が無いからですが、😇)
SSGやISRも必要であれば今後実装を進めていきます。

# Chat GPT 関連の情報

### 使用した OpenAI API 

モデル名:
gpt-3.5-turbo

特徴:
* 小規模で速度が速く、比較的簡単な自然言語処理タスクに使用されることが多い
* 従来の「text-davinci-003」比較して1/10のコストで使用可能
* 無料版の Chat GPT にも使用されているモデルで、対話に最適化されている


![スクリーンショット 2023-05-16 9.43.11.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/2980785/499ee8d4-1fe1-aff5-b4a5-1ab22dfe3b0f.png)

価格:
 **<font color="Green">$0.002 / 1K tokens</font>** 
なのですが、イメージが湧きにくいですよね💦
自身の体感ですが、前回日本語を3000文字送った際に3000トークン使用していたことから
1000文字あたり$0.002(0.22円ぐらい？)と考えています。英語だともっと割安になります。

また、
https://qiita.com/sakasegawa/items/db2cff79bd14faf2c8e0
より引用させていただくのですが、
こちらの記事では以下のように価格に関して記載がありました。
>以前のOpenAIのGPT-3.5系のAPIは $0.0200 / 1K tokens で、だいたい1000文字で3〜5円くらいでした。
今回のChatGPT APIは $0.002 / 1K tokens であるため、1/10のやすさになっています。(=>つまり、0.3〜0.5円くらい)

参考文献:

モデルの特徴について
https://dev.classmethod.jp/articles/open-api-lambda-test/
https://murasan-net.com/index.php/2023/03/10/chatgpt-api-gpt-3-5-turbo/


価格(OPEN AI 公式):
https://openai.com/pricing


### プロンプト内容
```
ユーザーが記述したコメントである『 ${premise} 』をより読みやすく、明確に伝わるように、
サンプルを参考にしつつ修正を行ってください 
サンプル : 『 ${referenceSentence} 』
```
※プロンプト文だったり、まだまだ改善の余地がかなり多めです💦

# アプリの概要

社内での連絡・報告・相談をスムーズに行うためのAIアシスタントアプリケーションです。事前に用意してあるコメントデータに基づいて、適切な文章を生成(修正)し、コミュニケーションを円滑に進めます。

### 具体例
例えば、
```
「おつかれさまー、
今日作業1と作業２やったんですよね〜」
```
と打ち込んだら、
```
「おつかれさまです。
下記、本日の作業内容となります。
・作業1
・作業2
<省略>
」
```
が生成されるイメージです。

アプリ作成の経緯としては、
仕事で上司の方に報告する際に
『文章をいい感じに修正してくれるツールがあったらな〜』
っていう思いから作った感じです！




#### 具体例:
ユーザーが入力した文章
*  『実装内容を確認していま~すっと。今やってる作業が終わったらまた連絡するんすけど〜、元々この後やる予定だった別の案件の作業は当分やらなくていいことになったんで今時間的に余裕あるんすよね〜。なんで作業終わったら別の作業しっかりと用意してもらえるとめっちゃ助かるっす〜！！』

返答内容
* 『現在、実装内容を確認しています。現在の作業が終了し次第、再度ご連絡いたします。また当初予定していた別の案件の作業は、当分延期になったため、時間的に余裕ができました。そのため、作業終了後他の作業内容を教えていただければ非常に助かります。』


#### 特徴:

* データをもとに、チャットGPTが効果的な連絡・報告・相談へ変換
* ユーザーが入力した文章を、適切なトーンや表現に自動変換し、円滑なコミュニケーションを実現。
* 上司や同僚への連絡時に、適切な文章を生成し、効率的なコミュニケーションをサポート。



※現状、完璧な解答はできませんが、こちらのツールである程度修正し、それを微調整することであらゆるケースにおいて機能します。（実際に自身も業務で使用しています笑）

※機密情報は取り扱っていません！


# 運用費と開発完了までの料金

### 運用費
サービスの運用費に関して、現状　Open API の料金とVercel Proの料金の合算が運用費となります。
3ヶ月使用して **<font color="Green">９０００円</font>** を想定しています。
外部公開の際に、諸事情で Vercel Pro の登録が自身の場合必要でした💦

内訳(月額)
* Vercel Pro (約2600円、20ドル)
* OpenAI API料金(100~500円)

### 開発完了までの料金
開発完了までの料金(Open API 代)は
0.05ドルです！

![スクリーンショット 2023-05-07 11.12.16.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/2980785/02e079ee-df37-2361-e11e-b5b96688563b.png)


# 開発環境、本番環境について
開発環境は単純に『npm run dev』でサーバーを起動して開発を進めました。

本番環境はVercel上でデプロイが成功した場合、勝手に開発用のサーバーから本番環境用に反映してくれる仕様です。
また、今回DBとして使用した 
 PlanetScale に関しては、Git のようにブランチを着ることが可能です。
ただめんどくさいことに加えて、そこまできっちりした開発ではなかったので、mainブランチのみを使用しました。

![スクリーンショット 2023-05-07 11.59.09.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/2980785/fab12d18-6095-8ae5-ac0c-4611219a6008.png)






# 苦労したこと

主に4点あります

### Next.js 13 で新たに追加された appディレクトリ関連

* ディレクトリ構成が変更したことによるキャッチアップ
* API ルーティング処理がかなり変更していました💦


### セキリティー関連の問題

サーバーサイド、クライアント側のどちらで処理を行うかのを判断し、
それに沿った実装をするのも大変でした。
例えば、元々はクライアント側で全ての機能を実装していましたが、
HTTPリクエストを送る際に下記キャプチャーのように
OpenAI APIキーの情報が見えてしまうことがわかりました。
そのため、一部Next.jsのAPI routeを使用したサーバーサイド側で必要な処理を実行することで、
この問題を解決しました。

<img width="1440" alt="スクリーンショット 2023-05-05 13 19 49" src="https://github.com/Masanarea/spinach/assets/93495976/ba74eebb-202f-4e1f-b058-115dc6baca77">



### プロンプト駆動開発における問題点

プロンプト駆動開発をする際に、Next.js13(最新バージョン)での記述法を参考にする必要がありました。
ただ、(ご存知の人もいるかもしれませんが、)Chat GPTでは
2021年9月までの情報のみ取り扱っていて、現在の情報にアクセスできない、
つまり、Next.js 13(appディレクトリ)の情報に沿ったコードを生成してくれないので、
ややめんどくさかったです。


具体例を挙げると、
例えば『app ディレクトリ対応のAPIを作成したい場合』などが実際にあって、
この場合、Next.js の最新のドキュメントのコードを参考にして、
Next.js 13の最新バージョンのコードを記述してくれるようにプロンプトを考えた感じです。

### プロンプト文（具体例）
```

Next.js 最新バージョンのコードである
『app ディレクトリ対応のNext.js 最新バージョンのコード、サンプルを貼り付ける』
を参考にして
〇〇を実現するコードを記述してください！
```

こうすることでAPI routeの処理をコピペするだけで、
最新バージョン(Next.jsの App ディレクトリ)対応のAPIを無事作成できました！


### Vercelのタイムアウトによる不具合

Vercelの freeプランの場合、
処理時間が10秒を超えるとHTTPステータスコード500(504)でのエラーでAPIでの文章生成（修正）に失敗してしまうことがわかりました。
そのため処理にかかる時間を減らすために、処理の見直しを行いましたが、
結論、問題なのはコードではなくて
API側のレスポンスの遅さが問題であったため(つまり自身が頑張ってもどうしようもない状況)、
Vercelの Pro プランに渋々加入することになりました。(月額約2600円)


# 参考にした文献等

### メインの参考文献
基本的には、
* **Chat GPT(3.5 と 4)**
* **各公式ドキュメント**

を参考にしました！
Chat GPT は有料プランにしているのですが、使用方法として
* Chat GPT 4  =>  精度や質を重視(時には英語で質問)
* Chat GPT 3.5 => 高速でのレスポンスだったり、レスポンス量が多い場合

のようにしていました。

### Next.js & TypeScript

* [新しいNext.jsの入門 ─ App DirectoryによるWeb開発をハンズオンで理解しよう
](https://eh-career.com/engineerhub/entry/2023/04/18/093000)

* [Next.js + TypeScriptの環境構築](https://qiita.com/itachi/items/05fbe67c7168703a34e7)

* [How to Build a REST API with Next.js 13](https://www.youtube.com/watch?v=-MFiza7ZRzs)<br>→APIルートをサーバーサイドで実行する際に参考にした動画。(Next13 app ディレクトリ対応)動画内のコードをカスタマイズして実装を完了させました。(※英語です)


### OpenAI API
* [OpenAIのAPI料金の計算方法](https://zenn.dev/umi_mori/books/chatbot-chatgpt/viewer/how_to_calculate_openai_api_prices)<br>　→ OpenAI API　を使用する際、トークンという概念によって金額が決定されるのですが、『トークン』がなんであるのかだったりがとても理解しやすい図解が多かった良記事です。

![スクリーンショット 2023-05-07 12.43.28.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/2980785/2339ec87-9281-d3c2-7508-9adcf2deef53.png)
![スクリーンショット 2023-05-07 12.43.44.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/2980785/c876a9f9-e549-eff6-9261-64dfd73690a2.png)



### PHP(Laravel) バックエンド側 API(Vercel上にデプロイ)
* [Laravel10をVercelに簡単にデプロイ！外部公開までの手順](https://qiita.com/Masanarea_qiita/items/2e1616e4e18f6c8ee26d)<br>　→ ※自分の記事です。<br>Vercelに無料でLaravelの最新バージョンであるLaravel 10 をデプロイする方法をわかりやすく解説しています。(現状:いいね+ストック数 が30を超えました！🎉)




# DB設計

#### ER図

![newTableList.drawio (1).png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/2980785/ac3c30ed-160a-18b3-97f7-a25b2a6aba94.png)


#### テーブルについて

今回は１テーブルで事足りました。

| カラム名 | 説明 | デフォルト値 |
|:-:|:-:|:-:|
| id  | プライマリーキー  |  |
|  ins_timestamp |  insertした日付 | CURRENT_TIMESTAMP |
| ins_user_id  | insertしたユーザーID  | 0 |
| ins_action  | insertコメント  |  |
| upd_timestamp  | updateした日付  |  |
| upd_user_id  | updateしたユーザーID  | 0 |
| upd_action  | updateコメント  |  |
| del_timestamp  | daleteした日付  |  |
| del_user_id  | daleteしたユーザーID  | 0 |
| del_action  | daleteコメント  |  |
| del_flag  | daleteフラグ  | 0 |
| ja_sentence  | 日本語コメントデータ  |  |
| en_sentence  | 英語コメントデータ  |  |
| sort_number  | 優先順位  | 999 |



# 今後の課題

* Chat gpt のレスポンス速度改善(可能であれば)
* ChatGPTに対するプロンプトの改善(※注１)
* 売上モデルの作成
* Slackへの導入(検討中)
* 保守・運用(大事！)
* Flutter アプリ化(検討中)
* リファクタリング(できる限り type => any の廃止)


※注１
ChatGPTに対する質問や作業指示のことを「プロンプト」と呼ぶらしいです

# 終わりに
まだ課題も多いですが、一つずつ改善してよりブラッシュアップしていきたく思います。


だいぶ長い記事になってしまいましたが、ここまで読んでいただきありがとうございました！✨


# おまけ

### Tweet
