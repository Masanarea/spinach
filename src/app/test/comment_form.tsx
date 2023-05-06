'use client'
import { GetStaticProps } from 'next'
import { useState, useEffect } from 'react'
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const openaiApiKey: string | undefined = process.env.NEXT_PUBLIC_OPENAI_API_KEY

type GenerateCommentRequestData = {
  premise: string
}

type GenerateCommentResponseData = {
  comment: string
}

export const UserPage = () => {
  async function fetchSentences() {
    // const response = await fetch("https://api-for-datumou-app.vercel.app/getSentenceList?limit=50");
    const response = await fetch(
      'https://api-for-datumou-app.vercel.app/getSentenceList?limit=1'
    )
    // const response = await fetch("https://api-for-datumou-app.vercel.app/getSentenceList?limit=5");
    // const response = await fetch("https://api-for-datumou-app.vercel.app/getSentenceList?limit=10");
    const data = await response.json()
    console.log('Working444')
    console.log(data.response_data)

    return data.response_data
  }

  const [sentences, setSentences] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const sentences = await fetchSentences()
      setSentences(sentences)
      console.log('Working')
      console.log(sentences)
    }
    console.log('Working121')

    fetchData()
  }, [])

  interface UserComment {
    text: string
  }

  const [userComment, setUserComment] = useState(
    '実装内容を確認している最中となります。また確認が終わり次第ご連絡させていただき、cst_tinker側の案件は当分は作業内容はありませんので順次もう１つの案件の作業に着手していければと考えております。'
  )
  const [generatedComment, setGeneratedComment] = useState<string>('')

  // console.log(openaiApiKey)
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')

  // return;

  const handleGenerateComment = async () => {
    setGeneratedComment('検索結果\nLoading...')
    const referenceDataLists: string[] = sentences
    const referenceSentence: string = referenceDataLists.join('\n\n')
    // console.log('APIデータの内容')
    // console.log(sentences)
    // console.log('参考にする資料');
    // console.log(referenceSentence);
    const prompt = `サンプルを参考にして、以下のユーザーが記述したコメントをより読み手に明確に内容が伝わるように修正して下さい\n\n ユーザーが記述したコメント : 『 ${comment} 』 \n\n サンプル : 『 ${referenceSentence} 』`
    console.log('プロンプトの内容')
    console.log(prompt)

    try {
      const API_URL = 'https://api.openai.com/v1/'
      const MODEL = 'gpt-3.5-turbo'
      const response = await axios.post(
        `${API_URL}chat/completions`,
        {
          // モデル ID の指定
          model: MODEL,
          // 質問内容
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        },
        {
          // 送信する HTTP ヘッダー(認証情報)
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openaiApiKey}`,
          },
        }
      )
      // 回答の取得
      const generatedText: string = response.data.choices[0].message.content

      setGeneratedComment(generatedText)
      console.log('レスポンス')
      console.log(response)
      console.log('生成されたコメント')
      console.log(generatedComment)
      console.log('入力値(生成されたコメント)')
      console.log(generatedText)
    } catch (error) {
      console.error(error)
      return null
    }

    // setGeneratedComment({ text: generatedText });
    // console.log(generatedComment)
  }

  return (
    <div className="bg-gray-50 min-h-screen bg-gradient-to-br from-yellow-300 to-red-500">
      <div className="max-w-2xl mx-auto py-6 px-4 sm:px-6 lg:py-12 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          ユーザーページ
        </h1>
        {/* <form  className="mt-6 space-y-6"> */}
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
          onClick={handleGenerateComment}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          送信
        </button>
        <p>{generatedComment}</p>
        {/* </form> */}
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
