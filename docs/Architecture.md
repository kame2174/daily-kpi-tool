# Architecture

**Project** : Daily KPI Dashboard

**Version** : 3.1.0

---

# 1. プロジェクト概要

Daily KPI Dashboard は、業務システムから出力した日次レポートを解析し、
KPI達成状況を自動集計・報告文として出力するWebアプリケーションです。

特定の会社・業界・商品に依存せず、
ユーザーが自由に設定できることを目的としています。

---

# 2. コンセプト

- 固有名詞を持たない
- 設定だけで利用可能
- PC・スマートフォン対応
- 日次報告に特化
- 月間分析は対象外（Excel VBAで実施）

---

# 3. 設計原則

本プロジェクトは以下の設計原則に従って開発する。

## Single Source of Truth

setting を唯一のデータソースとする。

---

## Render from State

画面は setting の状態から生成する。

---

## Configuration over Hard Coding

固有名詞はコードへ記述しない。

設定データから取得する。

---

## Separation of Responsibilities

画面・保存・計算は責務を分離する。

---

## Keep it Simple

必要になってから機能を追加する。
過度な設計は行わない。

---

# 4. システム構成

```text
設定
 ↓
入力
 ↓
解析
 ↓
KPI計算
 ↓
報告文生成
 ↓
コピー
```

---

# 5. データ構造

## 5.1 APP

```javascript
const APP = {

    VERSION: "3.1.0",

    STORAGE_KEY: "daily-kpi-dashboard"

};
```

---

## 5.2DEFAULT_SETTING

```javascript
const APP = {

    VERSION: "2.1.0",

    STORAGE_KEY: "daily-kpi-dashboard",
    
    DEFAULT_SETTING: {

    baseName: "",

    kpis: [

        {
            name: "",
            rate: 0
        },

        {
            name: "",
            rate: 0
        },

        {
            name: "",
            rate: 0
        }

    ]

}

};
```

---

## 5.3 setting

```javascript
let setting =
    structuredClone(
        APP.DEFAULT_SETTING
    );
```

---

# 5.4 setting構造

```text
setting
│
├── baseName
│
└── kpis[]
     ├── name
     └── rate
```

---

# 6. 画面構成

- KPI設定
- 入力
- 出力①（単日付帯率）
- 出力②（単日注力KPI）

---

# 7. システム処理フロー

```text
起動
 ↓
設定読込
 ↓
画面描画
 ↓
入力
 ↓
解析
 ↓
KPI計算
 ↓
出力
 ↓
コピー
```

---

# 8. 描画方式

画面は `setting` オブジェクトから生成する。

```text
setting
    ↓
renderKpiTable()
    ↓
HTML生成
```

KPIの追加・削除時は

```text
setting更新
    ↓
renderKpiTable()
```

を実行する。

KPI名・目標率の編集時は

```text
入力
    ↓
setting更新
```

のみ実行する。

入力中は画面を再描画しない。

---

KPIの追加・削除は setting を更新し、
必ず renderKpiTable() を再実行して画面を再描画する。

```text
追加

setting.kpis.push()

↓

renderKpiTable()

↓

画面更新
```

```text
削除

setting.kpis.splice()

↓

renderKpiTable()

↓

画面更新
```

---

# 9. 保存

保存先

- localStorage

保存対象

- 基準項目
- KPI項目
- KPI目標率

保存形式

```text
JSON
```

---

# 10. KPI管理

KPI設定は `setting.kpis` 配列で管理する。

画面は `setting` の内容を表示するだけであり、
画面自体はデータを保持しない。

KPI名・目標率の編集は
入力内容を直接 `setting` へ反映する。

追加・削除のみ
`renderKpiTable()` を実行する。

---

# 11. 削除仕様

KPIは最低1件保持する。

削除ボタン押下時

```text
KPI件数確認

↓

1件？

├ Yes
│
│   メッセージ表示
│
│   「KPIは1件以上必要です」
│
└ No
      ↓
setting.kpis.splice()

↓

renderKpiTable()

↓

画面更新
```

---

# 12. 状態更新フロー

追加

↓

setting更新

↓

render

----------------

削除

↓

setting更新

↓

render

----------------

編集

↓

setting更新

---

# Change History

## v3.0.0

- 初版作成

---

## v3.0.1

- 設計原則追加

---

## v3.0.2

- KPI削除仕様追加
- KPI管理仕様追加
- 描画方式を明文化

---

## v3.0.3

### UI同期

- KPI名同期追加
- KPI目標率同期追加
- 基準項目同期追加

settingをSingle Source of Truthとして運用開始。

---

## v3.1.0

## 更新日

2026-07-03

---

## 概要

アプリケーション全体をState Driven Architectureへ移行。

UI中心の設計から、`setting`を唯一の状態管理オブジェクトとする
Single Source of Truthへリファクタリングを実施。

---

## 更新内容

### Added

- APP.DEFAULT_SETTING追加
- 初期設定の一元管理
- structuredClone()による初期値生成

### Changed

- saveSetting()をsetting保存へ変更
- loadSetting()をsetting復元へ変更
- resetSetting()をsetting初期化へ変更
- calc()の計算対象をsetting.kpisへ変更
- KPI管理を完全動的化

### Removed

- APP.DEFAULT_KPI
- 固定3件前提の実装
- UI直接操作による設定管理

---

## 設計原則への影響

### Single Source of Truth

settingが唯一の状態管理となった。

### Render from State

画面更新はsettingからのみ行われる。

### Dynamic KPI

KPI件数・名称・目標率を完全動的化。

---

## 今後の改善候補

- render()へbaseName描画も統合
- Validation層追加
- Storage Version管理
- Migration処理追加