import { useState } from "react";
import CvForm from "./components/CvForm/CvForm";
import CVTable from "./components/CvTable/CvTable";
import CVPreview from "./components/CvPreview/CvPreview";
import styles from "./App.module.css";

function App() {
  const [cvs, setCvs] = useState([]);
  const [selectedCV, setSelectedCV] = useState(null);

  const handleCreateCV = (values) => {
    const newCV = {
      id: Date.now(),
      ...values,
    };

    setCvs((prevCvs) => [...prevCvs, newCV]);
    setSelectedCV(newCV);
  };

  const handleShowCV = (cv) => {
    setSelectedCV(cv);
  };

  const handleDeleteCV = (id) => {
    setCvs((prevCvs) => prevCvs.filter((cv) => cv.id !== id));

    if (selectedCV?.id === id) {
      setSelectedCV(null);
    }
  };

  return (
    <main className={styles.page}>
      <h1 className={styles.pageTitle}>CV Builder</h1>
      <div className={styles.layout}>
        <div className={styles.editorColumn}>
          <CvForm onCreateCV={handleCreateCV} />
          <CVTable cvs={cvs} onShowCV={handleShowCV} onDeleteCV={handleDeleteCV} />
        </div>
        <aside className={styles.previewColumn} aria-label="CV preview">
          <CVPreview selectedCV={selectedCV} />
        </aside>
      </div>
    </main>
  );
}

export default App;
