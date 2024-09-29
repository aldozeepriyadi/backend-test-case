import mongoose from 'mongoose';
import Book from '../models/Book';
import Member from '../models/Member';

// Menghubungkan ke MongoDB
mongoose.connect('mongodb://localhost:27017/library')
  .then(() => {
    console.log('Koneksi ke MongoDB berhasil');
    seedDatabase(); // Panggil fungsi migrasi setelah koneksi berhasil
  })
  .catch((error) => {
    console.error('Koneksi ke MongoDB gagal:', error);
  });

// Fungsi untuk mengisi database
const seedDatabase = async () => {
  try {
    // Menghapus data lama
    await Book.deleteMany({});
    await Member.deleteMany({});

    // Menambahkan data buku awal
    const books = [
      {
        code: "JK-45",
        title: "Harry Potter",
        author: "J.K Rowling",
        stock: 1
      },
      {
        code: "SHR-1",
        title: "A Study in Scarlet",
        author: "Arthur Conan Doyle",
        stock: 1
      },
      {
        code: "TW-11",
        title: "Twilight",
        author: "Stephenie Meyer",
        stock: 1
      },
      {
        code: "HOB-83",
        title: "The Hobbit, or There and Back Again",
        author: "J.R.R. Tolkien",
        stock: 1
      },
      {
        code: "NRN-7",
        title: "The Lion, the Witch and the Wardrobe",
        author: "C.S. Lewis",
        stock: 1
      }
    ];

    const members = [
      {
        code: "M001",
        name: "Angga",
      },
      {
        code: "M002",
        name: "Ferry",
      },
      {
        code: "M003",
        name: "Putri",
      },
    ];

    // Menyimpan data ke database
    await Book.insertMany(books);
    await Member.insertMany(members);

    console.log('Data awal berhasil dimasukkan ke dalam database!');
  } catch (error) {
    console.error('Terjadi kesalahan saat melakukan migrasi:', error);
  } finally {
    mongoose.connection.close();
  }
};
