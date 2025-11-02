"use client";
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import type { PatientRecord } from '../lib/blockchain';

export function PatientForm({ onSubmit }: { onSubmit: (record: PatientRecord) => void }) {
  const [form, setForm] = useState<PatientRecord>({
    patientId: '',
    name: '',
    dob: '',
    diagnosis: '',
    medications: '',
    notes: ''
  });

  const disabled = !form.patientId || !form.name || !form.dob || !form.diagnosis;

  return (
    <form className={styles.form} onSubmit={e => {
      e.preventDefault();
      if (disabled) return;
      onSubmit(form);
      setForm({ patientId: '', name: '', dob: '', diagnosis: '', medications: '', notes: '' });
    }}>
      <div className={styles.input}>
        <label>Patient ID</label>
        <input value={form.patientId} onChange={e => setForm({ ...form, patientId: e.target.value })} placeholder="e.g. MRN-12345" />
      </div>
      <div className={styles.input}>
        <label>Name</label>
        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
      </div>
      <div className={styles.input}>
        <label>Date of Birth</label>
        <input type="date" value={form.dob} onChange={e => setForm({ ...form, dob: e.target.value })} />
      </div>
      <div className={styles.input}>
        <label>Diagnosis</label>
        <input value={form.diagnosis} onChange={e => setForm({ ...form, diagnosis: e.target.value })} placeholder="Diagnosis" />
      </div>
      <div className={`${styles.input} ${styles.formFull}`}>
        <label>Medications</label>
        <input value={form.medications} onChange={e => setForm({ ...form, medications: e.target.value })} placeholder="Comma-separated" />
      </div>
      <div className={`${styles.input} ${styles.formFull}`}>
        <label>Notes</label>
        <textarea rows={3} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Optional notes" />
      </div>
      <div className={styles.formFull}>
        <button className={styles.button} disabled={disabled} type="submit">Add to Chain</button>
      </div>
    </form>
  );
}
