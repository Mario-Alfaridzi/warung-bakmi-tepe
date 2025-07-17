"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import InputField from "@/components/general/InputField";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "@/lib/redux/api/authApi";
import { uploadToCloudinary } from "@/cloudinary/uploadToCloudinary";

function RegisterPage() {
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
      const userData = await dispatch(registerUser(payload)).unwrap();

      toast.success(`Kamu Berhasil Register, ${userData.username}`);
      router.push("/login");
    } catch (error) {
      toast.error(error?.message || "Register gagal. Coba lagi.");
    }
  };

  return (
    <div className="flex flex-col gap-8 h-screen mb-50">
      <div className="bg-base-200 p-6">
        <Link href="/portal">
          <Image
            src="/assets/images/logo.png"
            alt="Logo"
            width={120}
            height={40}
          />
        </Link>
      </div>
      <div className="flex-1 flex flex-col justify-start items-center gap-6">
        <h3 className="text-4xl">Register Admin Menu</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[500px] bg-base-200 flex flex-col gap-3 p-6 rounded-md"
        >
          <div className="my-2">
            <InputField
              type="text"
              label="Username"
              id="username"
              placeholder="Masukkan Username"
              {...register("username", { required: "Username wajib diisi" })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="my-2">
            <InputField
              type="password"
              label="Password"
              id="password"
              placeholder="Masukkan Password"
              {...register("password", { required: "Password wajib diisi" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="my-2">
            <label htmlFor="imageProfile" className="font-semibold block mb-2">
              Gambar Profil
            </label>
            <input
              type="file"
              accept="image/*"
              id="imageProfile"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-900 border p-2 rounded-lg cursor-pointer   focus:outline-none"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-4 w-32 h-32 object-cover rounded-full border"
              />
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-fit bg-base-300 text-base-200 rounded-md"
          >
            {isSubmitting ? "Mendaftarkan..." : "Daftar"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
