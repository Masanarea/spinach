'use client'
import { useState } from 'react'

export const UserPage = () => {
  const [generatedComment, setGeneratedComment] = useState<string>('')

  const [comment, setComment] = useState<string>('')

  const handleGenerateComment = async () => {
    setGeneratedComment('検索結果 \n Loading...')

    try {
      const response = await fetch('/api/generateComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ premise: comment }),
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const data = await response.json()
      setGeneratedComment(data.comment)
      console.log('データ全般')
      console.log(data)
      console.log('生成されたコメント')
      console.log(data.comment)
      console.log('error message')
      console.log(data.errors)
    } catch (error) {
      console.error(error)
      setGeneratedComment(
        '申し訳ありませんが、サーバーで問題が発生しました。しばらくしてからもう一度お試しください。(We apologize, but a server-side issue occurred(about API from client side). Please try again later.)'
      )
      return null
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen bg-gradient-to-br from-yellow-300 to-red-500">
      <div className="max-w-2xl mx-auto py-6 px-4 sm:px-6 lg:py-12 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          ユーザーページ
        </h1>
        <div className="flex flex-wrap mb-6">
          <label
            htmlFor="comment"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            コメントを入力してください
          </label>
          <textarea
            name="comment"
            id="comment"
            className="bg-white border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={6}
            placeholder="ここにコメントを入力"
            onChange={(event) => setComment(event.target.value)}
            value={comment}
            required
          />
        </div>
        <button
          onClick={handleGenerateComment}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          送信
        </button>
        <p>{generatedComment}</p>
      </div>
    </div>
  )
}
