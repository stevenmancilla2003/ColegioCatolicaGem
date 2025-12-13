// src/componentes/FirestoreImage.tsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

interface FirestoreImageProps {
  collection: string;
  documentId: string;
  field: string;          // ej: "img"
  alt: string;
  className?: string;
}

const FirestoreImage: React.FC<FirestoreImageProps> = ({
  collection,
  documentId,
  field,
  alt,
  className
}) => {
  const [imageId, setImageId] = useState<string>("");

  useEffect(() => {
    const fetchImageId = async () => {
      try {
        const docRef = doc(db, collection, documentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as Record<string, any>;
          if (data[field]) {
            setImageId(data[field]);
          } else {
            console.warn(`El campo "${field}" no existe en el documento.`);
          }
        } else {
          console.warn("No se encontró el documento.");
        }
      } catch (error) {
        console.error("Error obteniendo la imagen:", error);
      }
    };

    fetchImageId();
  }, [collection, documentId, field]);

  const getImageUrl = (id: string) => {
    const originalDriveUrl = `https://drive.google.com/uc?export=view&id=${id}`;
    return `https://images.weserv.nl/?url=${encodeURIComponent(
      originalDriveUrl.replace("https://", "")
    )}`;
  };

  if (!imageId) {
    return <div className="animate-pulse bg-gray-200 h-48 w-full rounded-xl" />;
  }

  return (
    <img
      src={getImageUrl(imageId)}
      alt={alt}
      className={className}
    />
  );
};

export default FirestoreImage;