"use client";
import styles from '../styles/Home.module.css';
import type { Block } from '../lib/blockchain';

export function BlockCard({ block }: { block: Block }) {
  const tx = block.data.transactions[0];
  return (
    <div className={styles.blockCard}>
      <div className={styles.blockHeader}>
        <strong>Block #{block.header.blockNumber}</strong>
        <span className={styles.tag}>{new Date(block.header.timestamp).toLocaleString()}</span>
      </div>
      <div className={styles.hash}>Prev: {block.header.previousHash}</div>
      <div className={styles.hash}>Data: {block.header.dataHash}</div>
      <div className={styles.hash}>Hash: {block.hash}</div>
      {tx && (
        <div className={styles.record}>
          <div><strong>Patient:</strong> {tx.record.name} ({tx.record.patientId})</div>
          <div><strong>DOB:</strong> {tx.record.dob}</div>
          <div><strong>Dx:</strong> {tx.record.diagnosis}</div>
          {tx.record.medications && <div><strong>Meds:</strong> {tx.record.medications}</div>}
          {tx.record.notes && <div><strong>Notes:</strong> {tx.record.notes}</div>}
        </div>
      )}
    </div>
  );
}
