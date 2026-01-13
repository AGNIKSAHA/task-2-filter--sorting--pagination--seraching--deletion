interface Props {
  book: any
}

export default function BookCard({ book }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="font-semibold text-lg">{book.name}</h2>
      <p className="text-sm text-gray-600">{book.author}</p>
      <p className="text-sm">Year: {book.publishYear}</p>
    </div>
  )
}
