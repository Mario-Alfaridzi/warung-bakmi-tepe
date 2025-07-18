"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import InputField from "@/components/general/InputField";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useCreateMenuMutation } from "@/lib/redux/api/menuApi";
import { uploadToCloudinary } from "@/cloudinary/uploadToCloudinary";
import { formatRupiah, parseRupiah } from "@/utils/formatRupiah";
import { cn } from "@/lib/utils";

function TambahMenu() {
  const router = useRouter();

  const [preview, setPreview] = useState(null);
  const [createMenu] = useCreateMenuMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const gambarWatch = watch("image");

  useEffect(() => {
    const file = gambarWatch?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  }, [gambarWatch]);

  const displayPrice = watch("displayPrice") || "";

  const handlePriceChange = (e) => {
    const formatted = formatRupiah(e.target.value);
    setValue("displayPrice", formatted);
    setValue("price", parseRupiah(formatted));
  };

  const onSubmit = async (data) => {
    try {
      const image = await uploadToCloudinary(data.image[0]);

      const newMenu = {
        name: data.name,
        price: parseInt(data.price), // sudah dipastikan angka
        type: data.type,
        image,
      };

      await createMenu(newMenu).unwrap();
      toast.success("Menu berhasil ditambahkan!");
      router.push("/stok-menu");
    } catch (err) {
      toast.error("Gagal menambahkan menu", {
        description: err?.data?.message || "Terjadi kesalahan",
      });
    }
  };

  return (
    <div>
      <div className="bg-base-200 flex flex-col sm:flex-row sm:items-center justify-between p-2 my-6 rounded-lg">
        <span className="text-2xl">Tambah Menu</span>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-200 p-6 rounded-md flex flex-col gap-6"
      >
        <div>
          <InputField
            type="text"
            label="Nama menu"
            id="name"
            placeholder="Masukkan nama menu"
            {...register("name", { required: "Nama menu wajib diisi" })}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Harga */}
        <div>
          {/* Input Tampilan (Rp ...) */}
          <InputField
            type="text"
            label="Harga"
            id="displayPrice"
            placeholder="Masukkan harga"
            {...register("displayPrice")}
            value={displayPrice}
            onChange={handlePriceChange}
          />

          {/* Input tersembunyi untuk nilai angka */}
          <input
            type="hidden"
            {...register("price", {
              required: "Harga wajib diisi",
              min: { value: 1, message: "Harga minimal Rp 1" },
            })}
          />

          {/* Error Message */}
          {errors.price && (
            <p className="text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>

        {/* Tipe Menu */}
        <div>
          <label className="text-sm font-medium block mb-2">Tipe Menu</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="food"
                {...register("type", { required: "Tipe menu wajib dipilih" })}
                className="radio radio-primary"
              />
              <span>Makanan</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="drink"
                {...register("type", { required: "Tipe menu wajib dipilih" })}
                className="radio radio-primary"
              />
              <span>Minuman</span>
            </label>
          </div>
          {errors.type && (
            <p className="text-sm text-red-500 mt-1">{errors.type.message}</p>
          )}
        </div>

        {/* Gambar */}
        <div className="flex flex-col gap-2">
          <label htmlFor="image" className="text-sm font-medium">
            Gambar
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            {...register("image", {
              required: "Gambar wajib diunggah",
              validate: (files) =>
                (files && files.length > 0) || "Gambar wajib diunggah",
            })}
            className="p-2 border rounded-md"
          />
          {errors.image && (
            <p className="text-sm text-red-500">{errors.image.message}</p>
          )}
          {preview && (
            <Image
              src={preview}
              alt="Preview Gambar"
              width={200}
              height={200}
              className="object-cover rounded-md"
            />
          )}
        </div>

        {/* Tombol */}
        <div className="flex justify-end gap-4">
          <Link href="/menu">
            <Button
              type="button"
              className="bg-base-300 text-base-200 rounded-md"
            >
              Batal
            </Button>
          </Link>
          <Button
            type="submit"
            className="bg-base-300 text-base-200 rounded-md"
          >
            Tambah
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TambahMenu;
