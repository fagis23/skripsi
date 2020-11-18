const month = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const getFullDate = (date) => {
  const d = new Date(date);
  const hari = d.getDate();
  const bulan = month[d.getMonth()];
  const tahun = d.getFullYear();

  const fullTanggal = `${hari} ${bulan} ${tahun}`;
  return fullTanggal;
};
