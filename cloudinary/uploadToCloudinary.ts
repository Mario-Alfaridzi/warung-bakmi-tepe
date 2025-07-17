const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET); // ganti dengan upload preset yang udah dibuat
  formData.append("cloud_name", CLOUD_NAME); // ganti dengan cloud name yang udah dibuat

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  return data.secure_url; // data yang akan di simpan ke db
};
