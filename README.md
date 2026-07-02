# Daily KPI Dashboard

![Version](https://img.shields.io/badge/version-v3.1.0-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![Architecture](https://img.shields.io/badge/Architecture-State%20Driven-success)
![Status](https://img.shields.io/badge/status-Active-brightgreen)

基準項目に対する複数項目の比率を集計し、
目標値との差を自動計算するWebアプリケーションです。

業務システムからコピーした日次実績データを解析し、
レポート作成を効率化します。

特定の会社・業界・商品に依存しない設計を採用しており、
利用者が自由に集計項目と目標値を設定できます。

---

# このプロジェクトについて

毎日行っていたKPI集計業務を効率化するために開発しました。

当初は個人用ツールとして開発を開始しましたが、
業種や会社を問わず利用できるよう、
設定を自由に変更できる汎用的な設計へリファクタリングしています。

---

# 主な機能

- 集計項目の追加・削除
- 集計項目名・目標値の自由設定
- 基準項目の自由設定
- 設定の保存・読込（LocalStorage）
- 比率・目標差分の自動計算
- レポート自動生成
- ワンクリックコピー
- 入力エラーチェック

---

# スクリーンショット

> （公開前に追加予定）

---

# 動作環境

- Google Chrome
- Microsoft Edge

JavaScriptが有効なブラウザ

---

# 使用方法

## 1. 基準項目・集計項目を設定

- 基準項目を入力
- 集計項目を入力
- 目標値を設定

必要に応じて項目を追加・削除できます。

---

## 2. 設定を保存

「保存」を押すと、
設定内容がブラウザへ保存されます。

次回起動時も自動で復元されます。

---

## 3. データを貼り付け

業務システムからコピーしたテキストを入力欄へ貼り付けます。

例

```text
6/28

☆契約目標60件☆
残21件

☆オプションA目標18件☆
残5件

☆オプションB目標15件☆
残8件
```

※ 入力フォーマットは利用するシステムに合わせて調整してください。

---

## 4. 計算

「計算」を押すだけで

- 各項目の比率
- 目標値との差
- レポート

を自動生成します。

---

# プロジェクト構成

```text
Daily KPI Dashboard
│
├── index.html
├── css/
├── js/
│
├── README.md
├── Architecture.md
├── Decisions.md
├── CodingRules.md
├── ReleaseNotes.md
├── Roadmap.md
└── TechnicalDebt.md
```

---

# 設計方針

このプロジェクトでは以下の設計原則を採用しています。

- State Driven Architecture
- Single Source of Truth
- Render from State

アプリケーション全体の状態は `setting` オブジェクトで一元管理し、
保存・読込・計算・画面表示を統一しています。

設計の詳細は以下のドキュメントで管理しています。

- Architecture.md
- Decisions.md
- CodingRules.md

---

# 今後の予定

## Version 3.2

- render()の統合
- Validation機能強化
- 集計項目の並び替え
- 設定のエクスポート
- 設定のインポート

---

# 開発履歴

詳細は **ReleaseNotes.md** を参照してください。

---

# ライセンス

このプロジェクトは **MIT License** のもとで公開しています。

詳細は `LICENSE` を参照してください。

---

# 作者

**kame2174**
