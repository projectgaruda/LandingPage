export interface CompressionResult {
  file: File;
  originalKB: number;
  compressedKB: number;
}

export async function compressImage(
  file: File,
  maxDimension = 1920,
  quality = 0.82
): Promise<CompressionResult> {
  const originalKB = Math.round(file.size / 1024);

  const compressed = await new Promise<File>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round(height * (maxDimension / width));
            width = maxDimension;
          } else {
            width = Math.round(width * (maxDimension / height));
            height = maxDimension;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) { reject(new Error("Canvas not supported")); return; }
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) { reject(new Error("Compression failed")); return; }
            const outName = file.name.replace(/\.[^.]+$/, ".jpg");
            resolve(new File([blob], outName, { type: "image/jpeg", lastModified: Date.now() }));
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = reject;
      img.src = e.target!.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  return { file: compressed, originalKB, compressedKB: Math.round(compressed.size / 1024) };
}
