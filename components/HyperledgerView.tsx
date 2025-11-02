"use client";
import styles from '../styles/Home.module.css';
import type { Blockchain } from '../lib/blockchain';

export function HyperledgerView({ chain }: { chain: Blockchain }) {
  return (
    <div className={styles.blockGrid}>
      {chain.blocks.map((b) => (
        <div className={styles.blockCard} key={b.header.blockNumber}>
          <div className={styles.blockHeader}>
            <strong>Block #{b.header.blockNumber} (Hyperledger)</strong>
            <span className={styles.tag}>nonce {b.header.nonce}</span>
          </div>
          <div><strong>HEADER</strong></div>
          <div className={styles.hash}>previous_hash: {b.header.previousHash}</div>
          <div className={styles.hash}>data_hash: {b.header.dataHash}</div>
          <div className={styles.hash}>timestamp: {new Date(b.header.timestamp).toISOString()}</div>
          <div className={styles.record}>
            <div><strong>DATA</strong></div>
            <div>transactions: {b.data.transactions.length}</div>
          </div>
          <div className={styles.record}>
            <div><strong>METADATA</strong></div>
            <div>signatures: {b.metadata.signatures.join(', ') || 'none'}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
