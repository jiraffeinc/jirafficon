# jirafficon
[![Jirafficon docs](https://img.shields.io/badge/jirafficon-click_to_see_icons-ffb600.svg?style=for-the-badge)](https://jiraffeinc.github.io/jirafficon/docs/)
* common icon font for jiraffe

## Usage
## アイコンのデザイン
`src/ai/fonts.ai` にアートボードを追加し、アイコンをデザインする
**※パスが重なっていたりするとバグります。**

`src/svg/` 以下にsvgとしてアートボードを書き出します
file名をアイコン名にしてください。
### ex...
ファイル名を `tel.svg` とすると、
`.jirafficon-tel` で呼び出せるようになります


## Generate Icon Font
ターミナルで下記コマンドを実行
```
  yarn run generate-icons
```

## 確認
`docs/index.html` をブラウザで開いて正しく表示されていることを確認してください

## push
`package.json` の `"version"` 項目の数字をあげて下さい
githubにpushして完了です。

お疲れ様でした
