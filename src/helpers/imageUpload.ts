import { ChangeEvent } from "react";

export const imageUpload = (
  event: ChangeEvent<HTMLInputElement>,
  setSelectedImage: (value: string | null) => void
) => {
  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
};
