import { NextResponse } from 'next/server'
import axios from 'axios'

const openaiApiKey: string = process.env.OPENAI_API_KEY ?? ''

type GenerateCommentRequestData = {
  premise: string
}

// type GenerateCommentResponseData = {
//   comment: string;
// };

export async function POST(request: Request): Promise<NextResponse> {
  const { premise }: GenerateCommentRequestData = await request.json()
  try {
    const API_URL = 'https://api.openai.com/v1/'
    const MODEL = 'gpt-3.5-turbo'

    const referenceDataLists = await fetchSentences()
    const referenceSentence = referenceDataLists.join('\n\n')
    const prompt = `サンプルを参考にして、以下のユーザーが記述したコメントをより読み手に明確に内容が伝わるように修正して下さい\n\n ユーザーが記述したコメント : 『 ${premise} 』 \n\n サンプル : 『 ${referenceSentence} 』`

    const response = await axios.post(
      `${API_URL}chat/completions`,
      {
        model: MODEL,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    )

    const generatedText: string = response.data.choices[0].message.content
    return NextResponse.json({ comment: generatedText })
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      comment: '内部サーバーエラーが発生しました。(Internal Server Error)',
      errors: error,
    })
  }
}

async function fetchSentences() {
  const response = await fetch(
    'https://api-for-datumou-app.vercel.app/getSentenceList?limit=1'
  )
  // const response = await fetch('https://api-for-datumou-app.vercel.app/getSentenceList?limit=10');
  // const response = await fetch('https://api-for-datumou-app.vercel.app/getSentenceList?limit=52');
  const data = await response.json()
  return data.response_data
}
