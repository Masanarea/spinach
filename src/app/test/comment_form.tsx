'use client'
import { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'

export const UserPage: React.FC = () => {
  const [generatedComment, setGeneratedComment] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)
  const [comment, setComment] = useState<string>('')
  const [refComments, setRefComments] = useState<string[]>([''])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // const response = await fetch('https://api.example.com/data');
        // const data = await response.json();
        const response = await getProjects()
        // console.log('ここにSSGでのデータが表示されるはず')
        // console.log(response)
        setRefComments(response)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  const handleGenerateComment = async () => {
    if (comment.length > 140) {
      alert(
        'コメントは140文字以内で入力してください。\n(Please enter a comment within 150 characters.)'
      )
      return
    }
    setLoading(true)
    setGeneratedComment('検索結果 \n Loading...')

    try {
      const response = await fetch('/api/generateComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ premise: comment, refComments: refComments }),
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const data = await response.json()
      setGeneratedComment(data.comment)
      // console.log('データ全般')
      // console.log(data)
      // console.log('生成されたコメント')
      // console.log(data.comment)
      // console.log('error message')
      // console.log(data.errors)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setGeneratedComment(
        '申し訳ありませんが、サーバーで問題が発生しました。しばらくしてからもう一度お試しください。\n (お問い合わせはTwitter『https://twitter.com/Masa36940064』かメール『masa.php.engineer@gmail.com』からご連絡いただけると助かります！)'
      )
      setLoading(false)
      return null
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen bg-gradient-to-br from-yellow-300 to-red-500">
      {loading && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
          onClick={stopPropagation}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Loading...
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-2xl mx-auto py-6 px-4 sm:px-6 lg:py-12 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          チャットGPTコミュニケーター
        </h1>
        <div className="flex flex-wrap mb-6">
          <label
            htmlFor="comment"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            連絡・報告・相談内容を入力してください
          </label>
          <textarea
            name="comment"
            id="comment"
            className="bg-white border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={6}
            placeholder="ここに内容を入力"
            onChange={(event) => setComment(event.target.value)}
            value={comment}
            required
          />
        </div>
        <button
          onClick={handleGenerateComment}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          自動修正
        </button>
        <p>{generatedComment}</p>
      </div>
    </div>
  )
}

async function getProjects() {
  const res = await fetch(
    'https://api-for-datumou-app.vercel.app/getSentenceList?limit=4',
    { cache: 'no-store' }
  )
  const data = await res.json()
  const referenceComments = data.response_data
  console.log(referenceComments)
  return referenceComments
}
