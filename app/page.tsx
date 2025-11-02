"use client";
import { useEffect, useMemo, useState } from 'react';
import styles from '../styles/Home.module.css';
import { PatientForm } from '../components/PatientForm';
import { ChainView } from '../components/ChainView';
import { HyperledgerView } from '../components/HyperledgerView';
import { Blockchain, PatientRecord } from '../lib/blockchain';
import { loadChain, saveChain, clearChain, exportChainJson, importChainJson } from '../lib/persistence';

export default function Page() {
  const [blockchain, setBlockchain] = useState<Blockchain>(() => loadChain() ?? new Blockchain());
  const [hyperledgerMode, setHyperledgerMode] = useState<boolean>(false);

  useEffect(() => {
    saveChain(blockchain);
  }, [blockchain]);

  const addPatient = (record: PatientRecord) => {
    const chainCopy = Blockchain.fromJSON(blockchain.toJSON());
    chainCopy.addRecord(record);
    setBlockchain(chainCopy);
  };

  const reset = () => {
    const fresh = new Blockchain();
    setBlockchain(fresh);
    clearChain();
  };

  const onExport = () => {
    const data = exportChainJson(blockchain);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'patient-chain.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const onImport = async (file: File) => {
    const text = await file.text();
    const imported = importChainJson(text);
    setBlockchain(imported);
  };

  const isValid = useMemo(() => blockchain.validate(), [blockchain]);

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>PatientChain</h1>
        <div className={styles.headerActions}>
          <label className={styles.switch}>
            <input type="checkbox" checked={hyperledgerMode} onChange={e => setHyperledgerMode(e.target.checked)} />
            <span>Hyperledger view</span>
          </label>
          <button className={styles.secondary} onClick={reset}>Reset chain</button>
          <button className={styles.secondary} onClick={onExport}>Export</button>
          <label className={styles.importLabel}>
            Import
            <input type="file" accept="application/json" onChange={e => {
              const f = e.target.files?.[0];
              if (f) onImport(f);
            }} />
          </label>
        </div>
      </header>

      <section className={styles.section}>
        <h2>Add Patient Record</h2>
        <PatientForm onSubmit={addPatient} />
      </section>

      <section className={styles.section}>
        <div className={styles.chainHeader}>
          <h2>Blockchain</h2>
          <span className={isValid ? styles.valid : styles.invalid}>
            {isValid ? 'VALID' : 'INVALID'}
          </span>
        </div>
        {hyperledgerMode ? (
          <HyperledgerView chain={blockchain} />
        ) : (
          <ChainView chain={blockchain} />
        )}
      </section>

      <footer className={styles.footer}>
        <span>Install as app: Add to Home Screen</span>
      </footer>
    </main>
  );
}
