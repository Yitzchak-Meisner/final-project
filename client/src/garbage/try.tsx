// posts-----------------------------------------------------------------------------------------------------------


//   const [isDragging, setIsDragging] = useState(false);


//   const handleImageUpload = (files: FileList) => {
//     Array.from(files).forEach(file => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onloadend = () => {
//         setFormData(prev => ({
//           ...prev,
//           images: [...prev.images, reader.result as string]
//         }));
//       };
//     });
//   };

// <div
//         className={`dropzone ${isDragging ? 'dragover' : ''}`}
//         onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
//         onDragLeave={() => setIsDragging(false)}
//         onDrop={(e) => {
//           e.preventDefault();
//           setIsDragging(false);
//           handleImageUpload(e.dataTransfer.files);
//         }}
//       >
//         {formData.images.length > 0 ? (
//           <div className="images-preview">
//             {formData.images.map((img, idx) => (
//               <img key={idx} src={img} alt={`Preview ${idx + 1}`} className="preview-image" />
//             ))}
//           </div>
//         ) : (
//           <>
//             <Images className="upload-icon" />
//             <p>גרור תמונות לכאן או לחץ לבחירת תמונות</p>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
//             />
//           </>
//         )}
//   </div>


// images-----------------------------------------------------------------------------------------------------------



<div
className={`${styles.dropzone} ${isDragging ? styles.dragover : ''}`}
onClick={(e) => e.stopPropagation()}
onDragEnter={(e) => handleDragEvents(e, () => setIsDragging(true))}
onDragLeave={(e) => handleDragEvents(e, () => setIsDragging(false))}
onDragOver={(e) => handleDragEvents(e)}
onDrop={(e) => {
    handleDragEvents(e);
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
        handleImageUpload(files[0]);
    }
}}
>
{loading && (
    <div className={styles.loadingOverlay}>
        <span>מעלה תמונה...</span>
    </div>
)}
{!loading && (image ? (
    <img src={image} alt="Preview" className={styles.previewImage} />
) : (
    <>
        <Upload className={styles.uploadIcon} />
        <p>גרור תמונה לכאן או לחץ לבחירת תמונה</p>
        <input
            type="file"
            accept="image/*"
            multiple={false}
            onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
            className={styles.fileInput}
            onClick={(e) => e.stopPropagation()}
        />
    </>
))}
</div>
