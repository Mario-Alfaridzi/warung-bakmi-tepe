export const formatRupiah = (value) => {
  const numberString = value.replace(/[^\d]/g, "");
  return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".").replace(/^/, "Rp ");
};

export const parseRupiah = (value) => {
  if (!value) return 0;
  return parseInt(value.replace(/[^0-9]/g, ""), 10);
};
