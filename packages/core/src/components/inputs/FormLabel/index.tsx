import { useId, type ReactNode } from 'react';
import styles from './index.module.scss';

type Props = {
  /**
   * ラベルとして表示する文字列
   */
  label: string;
} & XOR<
  {
    /**
     * 紐付ける input 要素の `id` を指定します。
     */
    htmlFor: string;
  },
  {
    /**
     * 紐付ける input 要素を指定します。
     */
    children: ReactNode;
  }
>;

/**
 * 主にフォームなどに用いられるユーザーインターフェイスの項目のキャプションを表します。
 *
 * @remarks
 * `htmlFor` と `children` はどちらか一方のみを指定します。両方同時に指定することはできません。
 */
export const FormLabel = ({ label, htmlFor, children }: Props) => {
  const tooltipId = useId();

  return (
    <label htmlFor={htmlFor} className={styles.base}>
      <span id={tooltipId} className={styles['label-text']}>
        {label}
      </span>
      {children}
    </label>
  );
};
