import { useEffect, useState } from 'react'
import { api } from '../services/api'
import BookCard from '../components/BookCard'

export default function App() {
  const [books, setBooks] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    api.get('/books', { params: { name: search, page } })
      .then(res => setBooks(res.data))
  }, [search, page])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Book Catalog</h1>

      <input
        className="border p-2 mb-4 w-full"
        placeholder="Search by name"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books.map(book => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button onClick={() => setPage(p => Math.max(p - 1, 1))}>Prev</button>
        <button onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  )
}
