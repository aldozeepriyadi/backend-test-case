import mongoose from 'mongoose';

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/library')
  .then(() => {
    console.log('Koneksi ke MongoDB berhasil');
    runMigration(); // Jalankan migrasi setelah koneksi berhasil
  })
  .catch((error) => {
    console.error('Koneksi ke MongoDB gagal:', error);
  });

// Skema untuk koleksi books
const bookSchema = new mongoose.Schema({
  code: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  stock: { type: Number, required: true, default: 1 },
  borrowedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', default: null },
  borrowedAt: { type: Date, default: null }
});

// Skema untuk koleksi members
const memberSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  penalty: {
    status: { type: Boolean, default: false },
    endDate: { type: Date, default: null }
  }
});

// Model untuk books dan members
const Book = mongoose.model('Book', bookSchema);
const Member = mongoose.model('Member', memberSchema);

const runMigration = async () => {
  try {
    // Hapus koleksi jika sudah ada
    await Book.collection.drop().catch(() => console.log('Koleksi Book belum ada, membuat baru.'));
    await Member.collection.drop().catch(() => console.log('Koleksi Member belum ada, membuat baru.'));

    // Membuat koleksi berdasarkan skema
    await Book.createCollection();
    await Member.createCollection();

    // Tambahkan data awal ke dalam koleksi books
    const books = [
      { code: "JK-45", title: "Harry Potter", author: "J.K Rowling", stock: 1 },
      { code: "SHR-1", title: "A Study in Scarlet", author: "Arthur Conan Doyle", stock: 1 },
      { code: "TW-11", title: "Twilight", author: "Stephenie Meyer", stock: 1 },
      { code: "HOB-83", title: "The Hobbit, or There and Back Again", author: "J.R.R. Tolkien", stock: 1 },
      { code: "NRN-7", title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis", stock: 1 }
    ];
    await Book.insertMany(books);
    console.log('Koleksi books berhasil dibuat dan diisi data awal.');

    // Tambahkan data awal ke dalam koleksi members
    const members = [
      { code: "M001", name: "Angga", borrowedBooks: [] },
      { code: "M002", name: "Ferry", borrowedBooks: [] },
      { code: "M003", name: "Putri", borrowedBooks: [] }
    ];
    await Member.insertMany(members);
    console.log('Koleksi members berhasil dibuat dan diisi data awal.');

    console.log('Migrasi selesai.');
  } catch (error) {
    console.error('Terjadi kesalahan saat migrasi:', error);
  } finally {
    mongoose.connection.close();
  }
};
