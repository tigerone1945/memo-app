# memo-app

## 概要
社内メモ管理アプリ。メモの追加・編集・削除・カテゴリ分類ができる。
データはlocalStorageのキー `memo-app:memos` に保存される。
カテゴリは「仕事」「個人」「アイデア」の3種類（`App.jsx` の `CATEGORIES`）。

## 技術スタック
- React 19（UIライブラリ）
- JavaScript
- Vite 8（ビルドツール）
- oxlint（静的解析。設定は `.oxlintrc.json`）
- localStorage（データ永続化）

## ディレクトリ構造
src/
├── App.jsx        # アプリ本体（状態管理・UIを単一コンポーネントで実装）
├── App.css        # App用スタイル
├── main.jsx       # エントリーポイント
└── index.css      # グローバルスタイル

## 開発コマンド
- `npm run dev` - 開発サーバー起動
- `npm run build` - 本番ビルド
- `npm run preview` - ビルド結果のプレビュー
- `npm run lint` - oxlintチェック

テストは未導入。

## コーディング規約
- コンポーネントは関数コンポーネントで記述してください
- 変数名・関数名はキャメルケースで書いてください
- CSSクラス名にはハイフン区切りを使用してください
- コミットメッセージは日本語で書いてください

## 禁止事項
- console.logを本番コードに残さないでください
- 既存のテストを削除しないでください
- グローバル変数を使用しないでください