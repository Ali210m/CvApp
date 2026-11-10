import styles from "./CvTable.module.css";

function CVTable({ cvs, onShowCV, onDeleteCV }) {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Created CVs</h2>
      {cvs.length === 0 ? (
        <p className={styles.empty}>No CVs created yet.</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Profession</th>
                <th>Education</th>
                <th>Experience</th>
                <th>Skills</th>
                <th>About me</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cvs.map((cv) => (
                <tr key={cv.id}>
                  <td>{cv.fullName}</td>
                  <td>{cv.email}</td>
                  <td>{cv.phone}</td>
                  <td>{cv.profession}</td>
                  <td>{cv.education}</td>
                  <td>{cv.experience}</td>
                  <td>{cv.skills}</td>
                  <td>{cv.aboutMe}</td>
                  <td className={styles.actions}>
                    <button className={styles.showButton} type="button" onClick={() => onShowCV(cv)}>
                      Show CV
                    </button>
                    <button className={styles.deleteButton} type="button" onClick={() => onDeleteCV(cv.id)}>
                      Delete CV
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default CVTable;
