import { type ChangeEvent } from 'react';
import styles from './index.module.scss';

type Props = {
  /**
   * スライダーのキャプション
   */
  label: string;
  /**
   * 値の単位
   */
  unit: string;
  /**
   * 最小値
   */
  min: number;
  /**
   * 最大値
   */
  max: number;
  /**
   * コントロールの値
   */
  value: number;
  /**
   * 値が変更されたときにコールバックが発生します。
   *
   * @param value 変更された値
   */
  onChange: (value: number) => void;
};

/**
 * ラベルとスライダーの2つの要素で構成され、ラベルには常にスライダーの現在の動的値が表示されます。
 */
export const LabeledSlider = ({ label, unit, min, max, value, onChange }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <div>
      <label className={styles.base}>
        {label} : <strong>{value}</strong>
        {unit}
      </label>
      <input type="range" className={styles.input} min={min} max={max} value={value} onChange={handleChange} />
    </div>
  );
};
