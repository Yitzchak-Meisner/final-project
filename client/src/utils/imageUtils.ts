export const handleImageUpload = (files: FileList): Promise<string[]> => {
  const fileReaders = Array.from(files).map((file) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result as string);
        } else {
          reject(new Error('Failed to read file.'));
        }
      };
    });
  });

  return Promise.all(fileReaders);
};
