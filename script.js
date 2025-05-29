const BOBOT = {
    absen: 15,
    quiz: 15,
    tugas: 20,
    uts: 25,
    uas: 25
};
function nilaiAkhir(nilai) {
    return (
        (nilai.absen * BOBOT.absen / 100) +
        (nilai.quiz * BOBOT.quiz / 100) +
        (nilai.tugas * BOBOT.tugas / 100) +
        (nilai.uts * BOBOT.uts / 100) +
        (nilai.uas * BOBOT.uas / 100)
    );
}
function kriteriaGrade(nilai) {
    if (nilai >= 85) return "A";
    if (nilai >= 80) return "AB";
    if (nilai >= 75) return "B";
    if (nilai >= 70) return "BC";
    if (nilai >= 60) return "C";
    if (nilai >= 50) return "D";
    return "E";
}
function kategoriGrade(grade) {
    switch (grade) {
        case "A": return "Superior";
        case "AB": return "Sangat Baik";
        case "B": case "BC": case "C": return "Baik";
        case "D": return "Seadanya";
        case "E": return "Rata-rata";
        default: return "";
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const linkParameter = new URLSearchParams(window.location.search);
    const mahasiswa = {
        nama: linkParameter.get('nama') || 'Nama Mahasiswa',
        nim: linkParameter.get('nim') || 'NIM Tidak Diketahui',
        matkul: linkParameter.get('matkul') || 'Mata Kuliah',
    };
    const nilai = {
        absen: parseInt(linkParameter.get('absen')) || 0,
        quiz: parseInt(linkParameter.get('quiz')) || 0,
        tugas: parseInt(linkParameter.get('tugas')) || 0,
        uts: parseInt(linkParameter.get('uts')) || 0,
        uas: parseInt(linkParameter.get('uas')) || 0
    };
    document.getElementById('nama-mahasiswa').textContent = mahasiswa.nama;
    document.getElementById('nim-mahasiswa').textContent = `NIM: ${mahasiswa.nim}`;
    document.getElementById('mata-kuliah').textContent = mahasiswa.matkul;
    for (const key in nilai) {
        const nilaiKomponen = nilai[key];
        const kontribusi = (nilaiKomponen * BOBOT[key] / 100);
        document.getElementById(`nilai-${key}`).textContent = nilaiKomponen;
        document.getElementById(`progress-${key}`).style.width = `${nilai}%`;
        document.getElementById(`kontribusi-${key}`).textContent = kontribusi.toFixed(2);
    }
    const nilai_akhir = nilaiAkhir(nilai);
    const grade = kriteriaGrade(nilai_akhir);
    const kategori = kategoriGrade(grade);
    document.getElementById('final-score-value').textContent = nilai_akhir.toFixed(1);
    document.getElementById('final-score-progress').style.width = `${nilai_akhir}%`;
    const gradeBadge = document.getElementById('grade-badge-container');
    gradeBadge.textContent = grade;
    gradeBadge.className = `grade-badge grade-${grade}`;
    document.getElementById('kategori-text').textContent = kategori;
});