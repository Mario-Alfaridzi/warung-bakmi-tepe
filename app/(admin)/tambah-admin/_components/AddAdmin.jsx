"use client";

import { uploadToCloudinary } from "@/cloudinary/uploadToCloudinary";
import InputField from "@/components/general/InputField";
import { Button } from "@/components/ui/button";
import { addUser } from "@/lib/redux/api/authApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const AddAdmin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (formData) => {
    try {
      const imageFile = fileInputRef.current?.files?.[0];
      let uploadedImageUrl = "";

      if (imageFile) {
        const uploadResult = await uploadToCloudinary(imageFile);
        uploadedImageUrl = uploadResult;
      }

      const payload = {
        username: formData.username,
        password: formData.password,
        imageProfile: uploadedImageUrl,
      };

      console.log(uploadedImageUrl);
      console.log(payload);
      const userData = await dispatch(addUser(payload)).unwrap();

      toast.success(
        `Kamu Berhasil Menambahkan Admin Baru, ${userData.username}`
      );
    } catch (error) {
      toast.error(error?.message || "Tambah Admin Gagal. Coba lagi.");
    }
  };

  return (
    <div>
      <div className="bg-base-200 flex flex-col sm:flex-row sm:items-center justify-between p-2 my-6 rounded-lg">
        <span className="text-2xl">Tambah Admin</span>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-200 p-6 rounded-md flex flex-col gap-6"
      >
        {/* Username */}
        <div>
          <InputField
            type="text"
            label="Username"
            id="username"
            placeholder="Masukkan username admin"
            {...register("username", { required: "Username wajib diisi" })}
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <InputField
            type="password"
            label="Password"
            id="password"
            placeholder="Masukkan password admin"
            {...register("password", { required: "Password wajib diisi" })}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Gambar Profile */}
        <div className="flex flex-col gap-2">
          <label htmlFor="imageProfile" className="text-sm font-medium">
            Gambar Profil
          </label>
          <input
            id="imageProfile"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="p-2 border rounded-md"
          />
          {previewImage && (
            <Image
              src={previewImage}
              alt="Preview"
              width={200}
              height={200}
              className="object-cover rounded-md"
            />
          )}
        </div>

        {/* Tombol */}
        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            className="bg-primary text-white rounded-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Menyimpan..." : "Tambah Admin"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAdmin;
