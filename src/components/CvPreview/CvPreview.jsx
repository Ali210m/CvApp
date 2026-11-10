import styles from "./CvPreview.module.css";

function CVPreview({ selectedCV }) {
  if (!selectedCV) {
    return (
      <div className={styles.empty}>
        <h2>CV Preview</h2>
        <p>Select a CV to see its preview.</p>
      </div>
    );
  }

  return (
    <div className={styles.previewPanel}>
      <button className={styles.downloadButton} type="button" onClick={() => window.print()}>
        Save CV as PDF
      </button>
      <article className={styles.cvContainer}>
        <header className={styles.header}>
          {selectedCV.photoDataUrl && (
            <img className={styles.photo} src={selectedCV.photoDataUrl} alt={`${selectedCV.fullName} portrait`} />
          )}
          <div>
            <h1>{selectedCV.fullName}</h1>
            <h3>{selectedCV.profession}</h3>
          </div>
        </header>

        <section className={styles.section}>
          <h2>Contact Information</h2>
          <p><strong>Email:</strong> {selectedCV.email}</p>
          <p><strong>Phone:</strong> {selectedCV.phone}</p>
        </section>

        <section className={styles.section}>
          <h2>About Me</h2>
          <p>{selectedCV.aboutMe}</p>
        </section>

        <section className={styles.section}>
          <h2>Education</h2>
          <p>{selectedCV.education}</p>
        </section>

        <section className={styles.section}>
          <h2>Experience</h2>
          <p>{selectedCV.experience}</p>
        </section>

        <section className={styles.section}>
          <h2>Skills</h2>
          <p>{selectedCV.skills}</p>
        </section>

      </article>
    </div>
  );
}

export default CVPreview;
