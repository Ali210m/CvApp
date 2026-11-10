import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./CvForm.module.css";

const validationSchema = Yup.object({
  fullName: Yup.string()
    .matches(/^[\p{L}\p{M}][\p{L}\p{M}\s.'-]{1,49}$/u, "Enter a valid full name")
    .required("Full name is required"),
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Enter a valid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\+?(?=(?:\D*\d){9,15}\D*$)[\d\s()-]+$/, "Enter a valid phone number")
    .required("Phone is required"),
  profession: Yup.string()
    .matches(/^[\p{L}\p{M}][\p{L}\p{M}\s&+./'-]{1,59}$/u, "Enter a valid profession")
    .required("Profession is required"),
  education: Yup.string()
    .matches(/^(?=.*\S)[\p{L}\p{M}\p{N}\s\p{P}\p{S}]{2,120}$/u, "Enter valid education details")
    .required("Education is required"),
  experience: Yup.string()
    .matches(/^(?=.*\S)[\p{L}\p{M}\p{N}\s\p{P}\p{S}]{2,500}$/u, "Enter valid experience details")
    .required("Experience is required"),
  skills: Yup.string()
    .matches(/^(?=.*\S)[\p{L}\p{M}\p{N}\s.,+#/-]{2,200}$/u, "Enter valid skills")
    .required("Skills are required"),
  aboutMe: Yup.string()
    .matches(/^(?=.*\S)[\p{L}\p{M}\p{N}\s\p{P}\p{S}]{10,1000}$/u, "Use 10–1000 valid characters")
    .required("About me is required"),
  photoName: Yup.string(),
  photoDataUrl: Yup.string(),
});

const fields = [
  {
    name: "fullName",
    label: "Full Name",
    placeholder: "Enter your full name",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "Enter your phone",
    type: "tel",
  },
  {
    name: "profession",
    label: "Profession",
    placeholder: "Frontend Developer",
    type: "text",
  },
  {
    name: "education",
    label: "Education",
    placeholder: "Your education",
    type: "text",
  },
  {
    name: "experience",
    label: "Experience",
    placeholder: "Your experience",
    type: "text",
  },
  {
    name: "skills",
    label: "Skills",
    placeholder: "HTML, CSS, JavaScript...",
    type: "text",
  },
];

function CVForm({ onCreateCV }) {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      profession: "",
      education: "",
      experience: "",
      skills: "",
      aboutMe: "",
      photoName: "",
      photoDataUrl: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      onCreateCV(values);

      resetForm();
    },
  });

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Create Your CV</h2>
      <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
        {fields.map(({ name, label, placeholder, type }) => (
          <div className={styles.field} key={name}>
            <label className={styles.label} htmlFor={name}>
              {label}
            </label>
            <input
              className={styles.input}
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              value={formik.values[name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched[name] && formik.errors[name] && (
              <p className={styles.error}>{formik.errors[name]}</p>
            )}
          </div>
        ))}

        <div className={styles.field}>
          <label className={styles.label} htmlFor="aboutMe">
            About Me
          </label>
          <textarea
            className={styles.textarea}
            id="aboutMe"
            name="aboutMe"
            placeholder="Tell us about yourself"
            value={formik.values.aboutMe}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.aboutMe && formik.errors.aboutMe && (
            <p className={styles.error}>{formik.errors.aboutMe}</p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="photo">Photo (optional)</label>
          <input
            className={styles.input}
            id="photo"
            key={formik.values.photoName || "no-photo"}
            name="photo"
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0];
              if (!file) return;
              if (!file.type.startsWith("image/")) {
                formik.setFieldError("photoName", "Choose an image file.");
                return;
              }
              if (file.size > 5 * 1024 * 1024) {
                formik.setFieldError("photoName", "Choose an image smaller than 5 MB.");
                return;
              }

              const reader = new FileReader();
              reader.onload = () => {
                formik.setFieldValue("photoName", file.name);
                formik.setFieldValue("photoDataUrl", reader.result);
                formik.setFieldError("photoName", undefined);
              };
              reader.readAsDataURL(file);
            }}
          />
          {formik.errors.photoName ? (
            <p className={styles.error}>{formik.errors.photoName}</p>
          ) : formik.values.photoDataUrl ? (
            <div className={styles.photoPreview}>
              <img src={formik.values.photoDataUrl} alt="Selected CV portrait preview" />
              <span>{formik.values.photoName}</span>
            </div>
          ) : (
            <div className={styles.fileInfo}>No photo selected.</div>
          )}
        </div>

        <div className={styles.submitRow}>
          <button className={styles.button} type="submit">
            Create CV
          </button>
          {formik.submitCount > 0 && !formik.isValid && (
            <p className={styles.submitError} role="alert">
              Please correct the errors above before creating the CV.
            </p>
          )}
        </div>
      </form>
    </section>
  );
}

export default CVForm;
