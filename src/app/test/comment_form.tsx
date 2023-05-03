'use client'
import { useState } from 'react'
// import axios from 'axios'

export const UserPage: React.FC = () => {
  const [comments, setComments] = useState([])
  // const [content, setContent] = useState('')
  const [comment, setComment] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // ユーザーの前提条件を使用して、コメントを生成するためのAPIリクエストを送信する
    // const response = await axios.post('/api/generate-comment', { comment });
    // const response = await axios.post('/api/generate-comment', { comment });

    // APIから返されたコメントを表示する
    console.log('OK!!')
    // e.target.reset()
  }

  return (
    <div className="bg-gray-50 min-h-screen bg-gradient-to-br from-yellow-300 to-red-500">
      <div className="max-w-2xl mx-auto py-6 px-4 sm:px-6 lg:py-12 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          ユーザーページ
        </h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
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
              rows="6"
              placeholder="ここにコメントを入力"
              onChange={(event) => setComment(event.target.value)}
              value={comment}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            送信
          </button>
        </form>
        <div className="mt-6 space-y-6">
          {comments.map((comment, index) => (
            <div key={index} className="comment-container">
              <img
                className="h-12 w-12 rounded-full"
                src="https://source.unsplash.com/100x100/?person"
                alt=""
              />
              <div className="comment-text">
                <div className="text-sm font-medium text-gray-900">
                  ユーザー
                </div>
                <div className="text-sm text-gray-500">
                  {new Date().toLocaleDateString()}
                </div>
                <div className="mt-2 text-sm text-gray-700">{comment}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
