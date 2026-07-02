# Technical Debt

このドキュメントは、現時点では採用するが、
将来的に改善したい実装を管理する。

---

## TD-001

### KPI削除イベントのイベント委譲化

現状

renderKpiTable()実行後に
deleteBtnへイベントを再登録している。

将来

イベント委譲(Event Delegation)へ変更する。

理由

- イベント登録を1回にできる
- render処理を簡潔にできる
- 保守性向上

対象Version

Ver3.2

影響範囲

- renderKpiTable()
- bindEvents()

---

## TD-002

### saveSetting() の共通化

現状

saveSetting()のみ個別処理を持つ。

将来

共通保存処理へ変更する。

理由

settingオブジェクトだけを保存する設計へ移行するため。

対象Version

Ver3.1

影響範囲

- saveSetting()
- loadSetting()

---

## TD-003

### Validationの共通化

現状

各関数が個別に入力チェックを実施している。

将来

Validation関数へ集約する。

理由

入力チェックの重複を防ぐため。

対象Version

v3.2

---

## TD-009 render()の責務整理

### 内容

baseNameのみrenderKpiTable()外で描画している。

### 改善案

render()を作成し、

- baseName
- KPI一覧

をまとめて描画する。

### 優先度

Medium