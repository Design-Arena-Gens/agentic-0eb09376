"use client";
import styles from '../styles/Home.module.css';
import type { Blockchain } from '../lib/blockchain';
import { BlockCard } from './BlockCard';

export function ChainView({ chain }: { chain: Blockchain }) {
  const blocks = chain.blocks;
  return (
    <div className={styles.blockGrid}>
      {blocks.map((b) => (
        <BlockCard key={b.header.blockNumber} block={b} />
      ))}
    </div>
  );
}
