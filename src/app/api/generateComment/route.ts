import { NextResponse } from 'next/server'
import axios from 'axios'

const openaiApiKey: string = process.env.OPENAI_API_KEY ?? ''

type GenerateCommentRequestData = {
  premise: string
  refComments: string[]
}

// type GenerateCommentResponseData = {
//   comment: string;
// };

export async function POST(request: Request): Promise<NextResponse> {
  const { premise, refComments }: GenerateCommentRequestData =
    await request.json()
  try {
    const API_URL = 'https://api.openai.com/v1/'
    const MODEL = 'gpt-3.5-turbo'
    const referenceSentence = refComments.join('\n\n')
    const prompt = `ユーザーが記述したコメントである『 ${premise} 』をより読みやすく、明確に伝わるようにサンプルを参考にしつつ修正を行ってください \n\n サンプル : 『 ${referenceSentence} 』`
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
