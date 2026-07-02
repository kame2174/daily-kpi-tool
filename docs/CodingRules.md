# Coding Rules

Daily KPI Dashboard 開発ルール

---

# 1. 基本方針

- 読みやすさを最優先とする
- 動作だけでなく保守性を重視する
- コメント・設計書・コードを一致させる
- コードより先に設計を更新する

---

# 2. 開発フロー

要件変更

↓

Architecture更新

↓

Decisions更新

↓

レビュー

↓

実装

↓

テスト

↓

コミット

↓

ReleaseNotes更新

↓

README更新（必要時）

---

# 3. コメント

大きな処理は必ずコメントで区切る。

例

```javascript
//======================================
// 起動処理
//======================================

function init(){

}
```

コメントは

「何をする場所か」

を書く。

実装内容は書かない。

---

# 4. 関数

関数名は動詞から始める。

例

```javascript
init()

renderKpiTable()

saveSetting()

loadSetting()

copyOutput()

showMessage()
```

NG例

```javascript
table()

data()

setting()

button()
```

---

# 5. 変数

## 定数

すべて大文字。

```javascript
APP

DEFAULT_SETTING
```

---

## オブジェクト

キャメルケース。

```javascript
setting

result

item
```

---

## UI

画面部品はUIへまとめる。

```javascript
UI.input

UI.output1

UI.baseName
```

直接

```javascript
document.getElementById(...)
```

を何度も書かない。

---

# 6. データ管理

設定データは setting を唯一の参照先とする。

画面

↓

setting

↓

保存

↓

計算

すべて setting を利用する。

---

# 7. 描画

画面は render系関数のみ更新する。

例

```javascript
renderKpiTable()

renderOutput()
```

HTMLへ直接記述しない。

---

# 8. 保存

設定は localStorage を使用する。

保存対象

・基準項目

・KPI名

・目標率

保存形式

JSON

---

# 9. HTML

HTMLは画面レイアウトのみ記述する。

データはJavaScriptで生成する。

---

# 10. CSS

デザインのみ記述する。

色・サイズ・余白はCSSで管理する。

JavaScriptからstyleを直接変更しない。

classの追加・削除で制御する。

例

```javascript
button.classList.add("copySuccess");
```

---

# 11. JavaScript

1つの関数は

1つの役割

のみ持つ。

例

renderKpiTable()

↓

画面生成だけ

saveSetting()

↓

保存だけ

calc()

↓

計算だけ

---

# 12. エラー処理

try-catch を利用する。

ユーザーには

showMessage()

で通知する。

console.logはデバッグ時のみ使用する。

---

# 13. 命名規則

変数

camelCase

関数

camelCase

クラス

PascalCase（必要になった場合）

定数

UPPER_SNAKE_CASE

---

# 14. コミット

コミットは機能単位で行う。

良い例

feat: KPI動的追加機能

fix: 保存処理の不具合修正

refactor: setting管理へ変更

docs: Architecture更新

悪い例

更新

修正

いろいろ

---

# 15. 開発方針

コードを書く前に

「設計」を考える。

実装より

設計を優先する。

---

# 16. プロジェクト目標

Daily KPI Dashboard は

会社・業界に依存しない

日次KPIレポート作成ツール

を目指す。

利用者が

設定だけで利用できることを最優先とする。

---

# 17. 開発理念

Keep it Simple.

小さく作る。

必要になってから拡張する。

設計を崩さず育てる。

「動けば良い」ではなく

「読みやすく、育てやすいコード」

を目指す。

---

# 18. 実装指示ルール

コードを修正する場合は必ず以下の順で記載する。

1. 対象ファイル
2. 対象関数
3. 修正理由
4. 変更前
5. 変更後
6. 完了条件

---

# 19. State管理

画面を直接更新しない。

状態(setting)を更新し、

必要に応じてrender系関数で画面を更新する。

Stateを唯一のデータソースとする。

---

# 20. Validation

入力値は利用前に必ず検証する。

異常時は

throw new Error()

で例外を送出し、

calc()で一括処理する。