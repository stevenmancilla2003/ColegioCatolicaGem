// src/utils/getDriveImage.ts
export const getDriveImage = (id: string) => {
  if (!id) return "";
  const url = `https://drive.google.com/uc?export=view&id=${id}`;
  return `https://images.weserv.nl/?url=${encodeURIComponent(url.replace("https://", ""))}`;
};