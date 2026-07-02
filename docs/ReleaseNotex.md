# Release Notes

## Version 2.1.1

### Added

- KPI設定保存
- KPI設定読込
- KPI初期化
- コピーUI改善
- ボタンアニメーション

### Changed

- 入力クリア時に出力もリセット
- HTML / CSS / JavaScript分離

---

## Version 3.0.0（開発中）

### Planned

- 基準項目自由入力
- KPI動的追加
- KPI削除
- 動的画面生成
- 動的保存
- 動的読込
- 動的計算
- 動的出力

---

## Version 3.0.3（開発中）

### Added

- KPI名をリアルタイムで同期
- KPI目標率をリアルタイムで同期
- 基準項目をリアルタイムで同期

---

## Version 3.1.0

## ✨ Added

- DEFAULT_SETTING追加
- 動的KPI対応
- State管理

## 🔄 Changed

- Save/LoadをState管理へ変更
- ResetをState管理へ変更
- 計算処理をsetting.kpisへ変更

## 🗑 Removed

- DEFAULT_KPI
- 固定3件前提コード

## 🐞 Fixed

- 日付未入力時のエラーハンドリング追加
- LocalStorageデータ構造統一