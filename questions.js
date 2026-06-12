window.QUESTIONS = {
  main: [
    {
      question_id: "food",
      question: {
        ja: "今の気分で、夕食に選びたいものを1つ選んでください。",
        en: "Choose one food option you would like to have for dinner now."
      },
      options: {
        ja: ["ラーメン", "カレー", "寿司", "ピザ", "焼肉", "中華", "ハンバーガー", "韓国料理"],
        en: ["Ramen", "Curry", "Sushi", "Pizza", "Yakiniku", "Chinese food", "Hamburger", "Korean food"]
      }
    },
    {
      question_id: "weekend_place",
      question: {
        ja: "週末に行くなら、最も行きたい場所を1つ選んでください。",
        en: "Choose one place you would most like to visit on a weekend."
      },
      options: {
        ja: ["温泉", "海", "山", "美術館", "カフェ街", "映画館", "夜景スポット", "歴史的な街"],
        en: ["Hot spring", "Beach", "Mountain", "Art museum", "Cafe district", "Movie theater", "Night-view spot", "Historic town"]
      }
    },
    {
      question_id: "ai_app",
      question: {
        ja: "今使ってみたいAIアプリを1つ選んでください。",
        en: "Choose one AI app you would most like to try."
      },
      options: {
        ja: ["予定を自動で組むAI", "論文を要約するAI", "英語発表を練習するAI", "旅行先を提案するAI", "研究アイデアを出すAI", "食事を決めるAI", "返信文を考えるAI", "集中を管理するAI"],
        en: ["AI that schedules your day", "AI that summarizes papers", "AI that helps practice presentations", "AI that suggests travel destinations", "AI that generates research ideas", "AI that helps choose meals", "AI that writes message replies", "AI that manages focus"]
      }
    }
  ],
  bonus: {
    members: {
      ja: ["メンバーA", "メンバーB", "メンバーC", "メンバーD", "メンバーE", "メンバーF", "メンバーG", "メンバーH"],
      en: ["Member A", "Member B", "Member C", "Member D", "Member E", "Member F", "Member G", "Member H"]
    },
    questions: [
      { question_id: "bonus_ai_era", text: { ja: "この中で一番AI時代に強そうな人は？", en: "Who seems the strongest in the AI era?" } },
      { question_id: "bonus_leader", text: { ja: "この中で一番リーダーっぽい人は？", en: "Who seems most like a leader?" } },
      { question_id: "bonus_lost", text: { ja: "この中で一番旅行で迷子になりそうな人は？", en: "Who is most likely to get lost while traveling?" } },
      { question_id: "bonus_researcher", text: { ja: "この中で一番研究者っぽい人は？", en: "Who seems most like a researcher?" } },
      { question_id: "bonus_founder", text: { ja: "この中で一番起業しそうな人は？", en: "Who is most likely to start a company?" } }
    ]
  }
};
